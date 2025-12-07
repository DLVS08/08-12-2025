(() => {
  /* Common helpers */
  function rand(min, max) { return Math.random() * (max - min) + min; }

  /* ---- PAGE DETECTION ---- */
  const onIndex = !!document.getElementById('passwordSection');
  const onCake = !!document.getElementById('celebrationPage');
  const onGift = !!document.getElementById('giftWrap');

  /* ========== PASSWORD PAGE (index.html) ========== */
  if (onIndex) {
    const correctPassword = "Hii";
    const passwordInput = document.getElementById("passwordInput");
    const passwordBtn = document.getElementById("passwordBtn");
    const passwordError = document.getElementById("passwordError");

    function goToCake() {
      document.body.style.transition = "opacity .45s";
      document.body.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "cake.html";
      }, 450);
    }

    passwordBtn.addEventListener("click", () => {
      const entered = passwordInput.value.trim();
      if (entered === correctPassword) {
        passwordError.style.display = "none";
        goToCake();
      } else {
        passwordError.style.display = "block";
      }
    });

    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") passwordBtn.click();
    });

    return;
  }

  /* ========== CAKE PAGE (cake.html) ========== */
  if (onCake) {
    const confettiContainer = document.getElementById("confettiContainer");
    const emojiContainer = document.getElementById("emojiContainer");
    const popperLeft = document.querySelector('.popper-left');
    const popperRight = document.querySelector('.popper-right');
    const cakeWrap = document.getElementById('cakeWrap');
    const blowBtn = document.getElementById('blowBtn');
    const wishText = document.getElementById('wishText');
    const clothOverlay = document.getElementById('clothOverlay');

    // 🎵 Music setup
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.7;
    bgMusic.loop = true;

    const confettiColors = ["#ff9fcf","#ffd47a","#90f7ec","#fbb0ff","#a4e8ff","#ffe0b7","#ffb6c1"];
    const emojis = ["🎉","🎂","🎈","💝","✨","🥳","💖","🎊"];

    function createConfetti(x, y) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const w = rand(8, 14);
      el.style.width = `${w}px`;
      el.style.height = `${w * 1.4}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.background = confettiColors[Math.floor(rand(0, confettiColors.length))];
      el.style.opacity = 0.95;
      el.style.filter = `drop-shadow(0 0 6px ${el.style.background})`;
      el.style.animationDuration = `${rand(3, 4.5)}s`;
      el.style.transform = `rotate(${rand(0,360)}deg)`;
      confettiContainer.appendChild(el);
      setTimeout(()=> el.remove(), (parseFloat(el.style.animationDuration) + .5) * 1000);
    }

    function createEmoji(x, y) {
      const e = document.createElement('div');
      e.className = 'emoji';
      e.textContent = emojis[Math.floor(rand(0, emojis.length))];
      e.style.left = `${x}px`;
      e.style.top = `${y}px`;
      e.style.fontSize = `${rand(22, 40)}px`;
      e.style.filter = `drop-shadow(0 0 10px rgba(255,255,255,.9))`;
      e.style.animationDuration = `${rand(3.2, 5)}s`;
      emojiContainer.appendChild(e);
      setTimeout(()=> e.remove(), (parseFloat(e.style.animationDuration) + .4) * 1000);
    }

    function burstFromCorner(x, y) {
      for (let i=0;i<60;i++){
        setTimeout(()=> {
          const sx = x + rand(-40,40);
          const sy = y + rand(-20,20);
          createConfetti(sx, sy);
          if (Math.random() < 0.6) createEmoji(sx, sy);
        }, i * 30);
      }
    }

    // 🎊 Trigger poppers + confetti
    function startInitialPoppers() {
      popperLeft.classList.add('animate');
      popperRight.classList.add('animate');
      setTimeout(()=> burstFromCorner(80, window.innerHeight - 80), 200);
      setTimeout(()=> burstFromCorner(window.innerWidth - 80, window.innerHeight - 80), 350);
      setTimeout(()=> {
        cakeWrap.classList.remove('hidden');
        blowBtn.classList.remove('hidden');
        cakeWrap.style.opacity = 0;
        cakeWrap.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(()=> { cakeWrap.style.opacity = 1; cakeWrap.style.transform = "translateY(0)"; }, 50);
      }, 900);
    }

    function createSparkles(localX, localY, count=12) {
      for (let i=0;i<count;i++){
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = `${localX + rand(-30,30)}px`;
        s.style.top = `${localY + rand(-10,20)}px`;
        s.style.width = `${rand(3,7)}px`;
        s.style.height = s.style.width;
        s.style.animationDuration = `${rand(0.7,1.1)}s`;
        cakeWrap.appendChild(s);
        setTimeout(()=> s.remove(), 1200);
      }
    }

    function extinguishFlames() {
      const flames = cakeWrap.querySelectorAll('.flame');
      flames.forEach((f, idx) => setTimeout(()=> f.remove(), idx * 70));
    }

    function glowFireworksBurst() {
      const leftX = 80, leftY = window.innerHeight - 80;
      const rightX = window.innerWidth - 80, rightY = window.innerHeight - 80;
      for (let wave=0; wave<5; wave++){
        setTimeout(()=> {
          burstFromCorner(leftX, leftY);
          burstFromCorner(rightX, rightY);
        }, wave * 600);
      }
      setTimeout(()=> {
        confettiContainer.innerHTML = '';
        emojiContainer.innerHTML = '';
      }, 4200);
    }

    blowBtn.addEventListener('click', ()=> {
      blowBtn.disabled = true;
      extinguishFlames();
      const rect = cakeWrap.getBoundingClientRect();
      createSparkles(rect.width/2, 30, 18);
      wishText.classList.remove('hidden');
      glowFireworksBurst();
      setTimeout(()=> {
        document.body.style.transition = "opacity .5s";
        document.body.style.opacity = 0;
        setTimeout(()=> { window.location.href = "gift.html"; }, 500);
      }, 5000);
    });

    // 🎀 Cloth reveal logic
    if (clothOverlay) {
      clothOverlay.addEventListener('click', () => {
        clothOverlay.style.transition = "transform 1.5s ease, opacity 1s ease";
        clothOverlay.style.transform = "translateY(120%) rotate(5deg)";
        clothOverlay.style.opacity = "0";
        setTimeout(()=> clothOverlay.remove(), 1600);

        // Start music + confetti + show cake
        bgMusic.play().catch(()=> console.log("User gesture required."));
        setTimeout(()=> startInitialPoppers(), 1000);
      });
    }

    return;
  }

  /* ========== GIFT PAGE (gift.html) ========== */
  if (onGift) {
    const giftWrap = document.getElementById("giftWrap");
    const introSection = document.getElementById("intro");
    const seqSection = document.getElementById("sequence");
    const photoCard = document.getElementById("photoCard");
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

    const photos = [
      { src: "assets/hero.jpg", msg: "Happy Birthday, Priye — the day you were born, love learned how to breathe." },
      { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles." },
      { src: "assets/gallery4.jpg", msg: "Some reactions need heat, some need time...but mine only needed you to become something beautiful, something rare" },
      { src: "assets/gallery3.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you." },
      { src: "assets/gallery2.jpg", msg: "No wish could ever match the one I make for you — always, your happiness." }
     
    ];

    const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you —  my lady of love, my world

No matter what the situation is and how distant we are, you are the only one on my mind, in my heart. You have been my cute little chaos in my boring life making it filled with bright colours, excitement and joy. Thanks for being in my life, for each and every support and hope you gave.
May your Those bright smiles, that made my dull days come alive, become more and more bright and cheerful. May your day adds on more vibrant colours, lots of fun and glorious chapters to your life making it sweeter than your expectation.

No matter what, you are always my beloved cutie pie.. u r cherished so go on exploring more and more, being invisible and fighting harder and i will be always there exploring and adoring u and ur smile and bright eyes a little more, breaking through the invisibility of yours and cheering hardest for all your fights. 


Happy birthday, Priye 
— Yours, always in silence.`;
 
    let index = 0;

    function showPhoto(i) {
      if (i < 0 || i >= photos.length) return;
      photoImg.style.opacity = "0";
      setTimeout(()=> {
        photoImg.src = photos[i].src;
        photoMsg.textContent = photos[i].msg;
        progressText.textContent = `${i + 1} / ${photos.length}`;
        photoImg.style.opacity = "1";
      }, 260);
    }

    function doTransition(fromIdx, toIdx) {
      photoCard.classList.remove('fade-out','fade-in','slide-lr-out','slide-lr-in','slide-ud-out','slide-ud-in');
      if (fromIdx === 0 && toIdx === 1) {
        photoCard.classList.add('fade-out');
        setTimeout(()=> { showPhoto(toIdx); photoCard.classList.replace('fade-out','fade-in'); }, 480);
      } else if (fromIdx === 1 && toIdx === 2) {
        photoCard.classList.add('slide-lr-out');
        setTimeout(()=> { showPhoto(toIdx); photoCard.classList.replace('slide-lr-out','slide-lr-in'); }, 480);
      } else if (fromIdx === 2 && toIdx === 3) {
        photoCard.classList.add('slide-ud-out');
        setTimeout(()=> { showPhoto(toIdx); photoCard.classList.replace('slide-ud-out','slide-ud-in'); }, 480);
      } else {
        photoCard.classList.add('fade-out');
        setTimeout(()=> { showPhoto(toIdx); photoCard.classList.replace('fade-out','fade-in'); }, 480);
      }
    }

    function initPhotos() {
      photoCard.classList.add('glowy');
      photoImg.src = photos[0].src;
      photoMsg.textContent = photos[0].msg;
      progressText.textContent = `1 / ${photos.length}`;
    }

    if (giftWrap) {
      giftWrap.addEventListener('click', () => {
        giftWrap.classList.add('open');
        setTimeout(()=> {
          introSection.classList.add('hidden');
          seqSection.classList.remove('hidden');
          initPhotos();
        }, 700);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', ()=> {
        if (index < photos.length - 1) {
          const prev = index;
          index++;
          doTransition(prev, index);
        } else {
          seqSection.classList.add('hidden');
          letterSection.classList.remove('hidden');
        }
      });
    }

    if (envelopeWrap) {
      envelopeWrap.addEventListener('click', ()=> {
        if (!envelopeEl) return;
        envelopeEl.classList.add('open');
        setTimeout(()=> {
          letterCard.classList.remove('hidden');
          typeLetter(letterText);
        }, 500);
      });
    }

    function typeLetter(text) {
      letterTextEl.textContent = "";
      let i = 0;
      const t = setInterval(() => {
        letterTextEl.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(t);
      }, 18);
    }

    if (replayLetter) {
      replayLetter.addEventListener('click', ()=> typeLetter(letterText));
    }

    return;
  }
})();
