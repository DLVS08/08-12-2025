(() => {
  /* =======================
     PASSWORD + FLOW SETUP
     ======================= */
  const passwordSection = document.getElementById("passwordSection");
  const passwordInput = document.getElementById("passwordInput");
  const passwordBtn = document.getElementById("passwordBtn");
  const passwordError = document.getElementById("passwordError");
  const correctPassword = "Angry bird";

  // DOM sections
  const celebrationSection = document.getElementById("celebration");
  const confettiContainer = document.getElementById("confettiContainer");
  const emojiContainer = document.getElementById("emojiContainer");
  const cakeWrap = document.querySelector(".cake-wrap");
  const blowBtn = document.getElementById("blowCandlesBtn");
  const makeWishText = document.getElementById("makeWishText");

  const introSection = document.getElementById("intro");
  const giftWrap = document.getElementById("giftWrap");

  const seqSection = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");

  const letterSection = document.getElementById("letterSection");
  const envelopeWrap = document.getElementById("envelopeWrap");
  const envelopeEl = envelopeWrap ? envelopeWrap.querySelector(".envelope") : null;
  const letterCard = document.getElementById("letterCard");
  const letterTextEl = document.getElementById("letterText");
  const replayLetter = document.getElementById("replayLetter");

  // For confetti/emoji timers so we can stop/clear them
  let confettiTimeout = null;
  let emojiTimeout = null;
  let confettiCreateInterval = null;
  let emojiCreateInterval = null;

  // PREVIOUS content (photos & letter) — unchanged content from your earlier script
  const photos = [
    { src: "assets/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe." },
    { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles." },
    { src: "assets/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you." },
    { src: "assets/gallery3.jpg", msg: "No wish could ever match the one I make for you — always, your happiness." }
  ];

  const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you — not just for who you are, but for what you’ve made me become.  
More patient. More gentle. More real.

Happy birthday, Priye.  
— Yours, always in silence.`;

  /* ===========================
     PASSWORD HANDLING
     =========================== */
  passwordBtn.addEventListener("click", () => {
    const entered = passwordInput.value.trim();
    if (entered === correctPassword) {
      passwordSection.style.display = "none";
      passwordError.style.display = "none";
      // show celebration section
      celebrationSection.classList.remove("hidden");
      startCelebrationSequence();
    } else {
      passwordError.style.display = "block";
    }
  });

  // Allow pressing Enter to submit
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") passwordBtn.click();
  });

  /* ===========================
     CELEBRATION — Confetti & Emojis
     =========================== */

  // colors for confetti (glowing but soft — match theme)
  const confettiColors = [
    "#FF7B9C", // pink
    "#FFD47A", // warm yellow
    "#FFB6C1", // soft rose
    "#FFD1E0", // pale pink
    "#FFF1C9"  // cream
  ];

  const emojis = ["🎉", "🎂", "🎈", "💝", "✨", "🥳"];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createConfettiPiece() {
    const d = document.createElement("div");
    d.className = "confetti";
    const size = Math.floor(rand(7, 14));
    d.style.width = `${size}px`;
    d.style.height = `${size * 1.6}px`;
    const color = confettiColors[Math.floor(rand(0, confettiColors.length))];
    d.style.background = color;
    d.style.left = `${rand(0, 100)}%`;
    d.style.top = `${rand(-10, 0)}vh`;
    // random rotation duration by setting inline transform animation delay/ duration is controlled by css but we can randomize animation duration via style
    const dur = rand(2.6, 4.2).toFixed(2);
    d.style.animationDuration = `${dur}s`;
    confettiContainer.appendChild(d);

    // remove after animation ends (give little extra time)
    setTimeout(() => {
      if (d.parentNode) d.parentNode.removeChild(d);
    }, (parseFloat(d.style.animationDuration) + 0.3) * 1000);
  }

  function createEmoji() {
    const e = document.createElement("div");
    e.className = "emoji";
    e.textContent = emojis[Math.floor(rand(0, emojis.length))];
    // start near bottom so they float up
    e.style.left = `${rand(8, 92)}%`;
    e.style.top = `${rand(60, 95)}%`;
    // random font-size
    e.style.fontSize = `${Math.floor(rand(18, 34))}px`;
    // random animation duration slightly different for each
    const dur = rand(3.8, 5.2).toFixed(2);
    e.style.animationDuration = `${dur}s`;
    emojiContainer.appendChild(e);

    // remove after animation
    setTimeout(() => {
      if (e.parentNode) e.parentNode.removeChild(e);
    }, (parseFloat(e.style.animationDuration) + 0.3) * 1000);
  }

  function startConfettiBurst() {
    // create a flurry for ~1.2s quickly then slower until stop
    let burstCount = 0;
    confettiCreateInterval = setInterval(() => {
      // create a few pieces each tick
      createConfettiPiece();
      if (Math.random() < 0.6) createConfettiPiece();
      if (Math.random() < 0.35) createConfettiPiece();

      burstCount++;
      // after a certain number, slow or stop additional mass
      if (burstCount > 20) {
        // after 20 ticks (about ~0.6s-1s), we will keep spawning but less often until cleared
        clearInterval(confettiCreateInterval);
        confettiCreateInterval = setInterval(() => {
          if (Math.random() < 0.5) createConfettiPiece();
        }, 160);
      }
    }, 60);

    // stop fully after 4.2s (you wanted confetti stop shortly before cake interaction)
    confettiTimeout = setTimeout(() => {
      if (confettiCreateInterval) clearInterval(confettiCreateInterval);
      // clear leftover confetti after some time (they remove themselves on animation end)
    }, 4200);
  }

  function startEmojiBurst() {
    // similar burst for emojis
    let count = 0;
    emojiCreateInterval = setInterval(() => {
      createEmoji();
      count++;
      if (count > 10) {
        clearInterval(emojiCreateInterval);
        // gentle leftover emojis
        emojiCreateInterval = setInterval(() => {
          if (Math.random() < 0.45) createEmoji();
        }, 220);
      }
    }, 140);

    // stop after ~4.2s
    emojiTimeout = setTimeout(() => {
      if (emojiCreateInterval) clearInterval(emojiCreateInterval);
    }, 4200);
  }

  function startCelebrationSequence() {
    // show celebration (already unhidden by caller), start bursts
    // clear previous containers if any
    confettiContainer.innerHTML = "";
    emojiContainer.innerHTML = "";
    makeWishText.style.display = "none";
    blowBtn.disabled = false;

    // Start confetti & emojis
    startConfettiBurst();
    startEmojiBurst();

    // Focus: confetti stops after ~4.2s and emojis stop too. Cake remains visible and candles flicker (handled by CSS)
  }

  /* ===========================
     BLOW CANDLES LOGIC
     =========================== */

  function createSparklesAt(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = `${x + rand(-12, 12)}px`;
      s.style.top = `${y + rand(-6, 6)}px`;
      s.style.width = `${rand(3, 6)}px`;
      s.style.height = s.style.width;
      s.style.opacity = "1";
      // tiny random animation duration
      s.style.animationDuration = `${rand(0.6, 1.2).toFixed(2)}s`;
      cakeWrap.appendChild(s);
      // remove after animation
      setTimeout(() => {
        if (s.parentNode) s.parentNode.removeChild(s);
      }, 1300);
    }
  }

  blowBtn.addEventListener("click", () => {
    // Prevent double clicks
    blowBtn.disabled = true;

    // extinguish flames: we will remove .flame elements (CSS flame used)
    const flames = celebrationSection.querySelectorAll(".flame");
    // coordinate for sparkles: center of cakeWrap
    const rect = cakeWrap.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.top + 18; // small offset so sparkles appear near candles (y relative to page)
    // convert to coordinates relative to cakeWrap for placing sparkles inside cakeWrap
    const localX = rect.width / 2;
    const localY = 18;

    flames.forEach((f, i) => {
      // quick fade-out effect: create small delay per flame for staggered feel
      setTimeout(() => {
        if (f.parentNode) f.parentNode.removeChild(f);
        // spawn some sparkles for each removed flame near it
        // compute approximate x offset based on candle index if possible
        createSparklesAt(localX + (i - (flames.length - 1) / 2) * 18, localY, 6);
      }, i * 80);
    });

    // Also spawn a few larger sparkles in center
    setTimeout(() => createSparklesAt(localX, localY - 8, 12), 220);

    // show "Make a wish..." text
    makeWishText.style.display = "block";

    // After 5 seconds (your request), transition automatically to gift/giftWrap (intro section)
    setTimeout(() => {
      // clear any running confetti/emoji intervals to be safe
      if (confettiCreateInterval) clearInterval(confettiCreateInterval);
      if (emojiCreateInterval) clearInterval(emojiCreateInterval);
      if (confettiTimeout) clearTimeout(confettiTimeout);
      if (emojiTimeout) clearTimeout(emojiTimeout);

      // hide celebration, show the intro/gift stage (keeping existing intro/gift markup & behavior)
      celebrationSection.classList.add("hidden");
      // show intro section (gift)
      introSection.classList.remove("hidden");
    }, 5000);
  });

  /* ===========================
     GIFT / PHOTO / LETTER (unchanged logic, integrated)
     =========================== */

  // original gift/photo/letter code preserved:
  let index = 0;

  // ensure giftWrap exists (it should)
  if (giftWrap) {
    giftWrap.addEventListener("click", () => {
      giftWrap.classList.add("open");
      setTimeout(() => {
        introSection.classList.add("hidden");
        seqSection.classList.remove("hidden");
        showPhoto(0);
      }, 700);
    });
  }

  function showPhoto(i) {
    if (i < 0 || i >= photos.length) return;
    index = i;
    photoImg.src = photos[i].src;
    photoMsg.textContent = photos[i].msg;
    progressText.textContent = `${i + 1} / ${photos.length}`;
    nextBtn.textContent = (i === photos.length - 1) ? "Open the letter" : "Next";
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (index < photos.length - 1) {
        showPhoto(index + 1);
      } else {
        seqSection.classList.add("hidden");
        letterSection.classList.remove("hidden");
      }
    });
  }

  if (envelopeWrap) {
    envelopeWrap.addEventListener("click", () => {
      if (!envelopeEl) return;
      envelopeEl.classList.add("open");
      setTimeout(() => {
        if (letterCard) {
          letterCard.classList.remove("hidden");
          typeLetter(letterText);
        }
      }, 500);
    });
  }

  function typeLetter(text) {
    if (!letterTextEl) return;
    letterTextEl.textContent = "";
    let i = 0;
    const t = setInterval(() => {
      letterTextEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(t);
    }, 18);
  }

  if (replayLetter) {
    replayLetter.addEventListener("click", () => {
      typeLetter(letterText);
    });
  }

  /* ===========================
     CLEANUP ON NAV/RE-OPEN
     (optional defensive: clear timers if user navigates away or re-runs)
     =========================== */
  window.addEventListener("beforeunload", () => {
    if (confettiCreateInterval) clearInterval(confettiCreateInterval);
    if (emojiCreateInterval) clearInterval(emojiCreateInterval);
    if (confettiTimeout) clearTimeout(confettiTimeout);
    if (emojiTimeout) clearTimeout(emojiTimeout);
  });

})();
