(() => {
  /* Common helpers */
  function rand(min, max) { return Math.random() * (max - min) + min; }

  /* ---- PAGE DETECTION ---- */
  const onIndex = !!document.getElementById('passwordSection');
  const onCake = !!document.getElementById('celebrationPage');
  const onGift = !!document.getElementById('giftWrap');

  /* ========== PASSWORD PAGE (index.html) ========== */
  if (onIndex) {
    const correctPassword = "Angry bird";
    const passwordInput = document.getElementById("passwordInput");
    const passwordBtn = document.getElementById("passwordBtn");
    const passwordError = document.getElementById("passwordError");

    function goToCake() {
      // small fade then redirect for smoothness
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

    return; // stop here on index
  }

  /* ========== CAKE PAGE (cake.html) ========== */
  if (onCake) {
    // DOM items
    const confettiContainer = document.getElementById("confettiContainer");
    const emojiContainer = document.getElementById("emojiContainer");
    const popperLeft = document.querySelector('.popper-left');
    const popperRight = document.querySelector('.popper-right');
    const cakeWrap = document.getElementById('cakeWrap');
    const blowBtn = document.getElementById('blowBtn');
    const wishText = document.getElementById('wishText');

    // confetti colors and emoji list
    const confettiColors = ["#FF7B9C","#FFD47A","#FFB6C1","#FFD1E0","#FFF1C9"];
    const emojis = ["🎉","🎂","🎈","💝","✨","🥳"];

    // Track intervals/timeouts
    let confettiInterval = null;
    let emojiInterval = null;
    let stopTimeout = null;

    // create confetti piece
    function createConfetti(x, y, spread=40) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const w = Math.floor(rand(7, 14));
      el.style.width = `${w}px`;
      el.style.height = `${Math.floor(w * 1.4)}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.background = confettiColors[Math.floor(rand(0, confettiColors.length))];
      el.style.opacity = 0.95;
      // random fall duration
      el.style.animationDuration = `${rand(2.8, 4.2)}s`;
      // small random rotation
      el.style.transform = `rotate(${rand(0,360)}deg)`;
      confettiContainer.appendChild(el);
      // cleanup
      setTimeout(()=>{ if (el.parentNode) el.parentNode.removeChild(el); }, (parseFloat(el.style.animationDuration) + .5) * 1000);
    }

    // create emoji floating from a start x,y
    function createEmoji(x, y) {
      const e = document.createElement('div');
      e.className = 'emoji';
      e.textContent = emojis[Math.floor(rand(0, emojis.length))];
      e.style.left = `${x}px`;
      e.style.top = `${y}px`;
      e.style.fontSize = `${Math.floor(rand(18, 36))}px`;
      e.style.animationDuration = `${rand(3.6, 5.2)}s`;
      emojiContainer.appendChild(e);
      setTimeout(()=>{ if (e.parentNode) e.parentNode.removeChild(e); }, (parseFloat(e.style.animationDuration) + .4) * 1000);
    }

    // Launch burst from a corner (popper element)
    function burstFromPopper(popperEl, side) {
      if (!popperEl) return;
      const rect = popperEl.getBoundingClientRect();
      const startX = rect.left + rect.width/2;
      const startY = rect.top + rect.height/2;
      // create many confetti quickly (flurry)
      for (let i=0;i<30;i++){
        setTimeout(()=> {
          // slightly randomize start position
          const sx = startX + rand(-20,20);
          const sy = startY + rand(-10,10);
          createConfetti(sx + 'px', sy + 'px');
          if (Math.random() < 0.45) createEmoji(sx + 'px', sy + 'px');
        }, i * rand(6,20));
      }
    }

    // start the celebration sequence on load
    function startCelebration() {
      // small popper animate for visual
      popperLeft.classList.add('animate');
      popperRight.classList.add('animate');

      // burst from left and right slightly staggered
      setTimeout(()=> burstFromPopper(popperLeft, 'left'), 250);
      setTimeout(()=> burstFromPopper(popperRight, 'right'), 350);

      // also create a gentle ongoing (but short-lived) confetti trickle from center
      let ticks = 0;
      confettiInterval = setInterval(()=> {
        const cx = window.innerWidth * (0.3 + Math.random()*0.4);
        const cy = window.innerHeight * (0.85 + Math.random()*0.06);
        createConfetti(`${cx}px`, `${cy}px`);
        if (Math.random() < 0.3) createEmoji(`${cx}px`, `${cy}px`);
        ticks++;
        if (ticks > 30) {
          clearInterval(confettiInterval);
        }
      }, 90);

      // after ~1.2s reveal cake
      setTimeout(()=> {
        cakeWrap.classList.remove('hidden');
        cakeWrap.style.opacity = 0;
        cakeWrap.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(()=> { cakeWrap.style.opacity = 1; cakeWrap.style.transform = "translateY(0)"; }, 50);
      }, 900);

      // stop heavy confetti after ~4.2s total (user asked confetti stop after some time)
      stopTimeout = setTimeout(()=> {
        if (confettiInterval) clearInterval(confettiInterval);
        if (emojiInterval) clearInterval(emojiInterval);
      }, 4200);
    }

    // sparkles inside cakeWrap on blow
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
        setTimeout(()=>{ if (s.parentNode) s.parentNode.removeChild(s); }, 1200);
      }
    }

    // extinguish flame DOM nodes
    function extinguishFlames() {
      const flames = cakeWrap.querySelectorAll('.flame');
      flames.forEach((f, idx) => {
        setTimeout(()=> {
          if (f.parentNode) f.parentNode.removeChild(f);
        }, idx * 70);
      });
    }

    // blow button handler
    blowBtn.addEventListener('click', ()=> {
      blowBtn.disabled = true;
      // extinguish and create sparkles
      const rect = cakeWrap.getBoundingClientRect();
      const localX = rect.width/2;
      const localY = 30;
      extinguishFlames();
      createSparkles(localX, localY, 18);
      wishText.classList.remove('hidden');
      // after 5s redirect to gift.html with fade
      setTimeout(()=>{
        document.body.style.transition = "opacity .5s";
        document.body.style.opacity = 0;
        setTimeout(()=> { window.location.href = "gift.html"; }, 500);
      }, 5000);
    });

    // start when DOM ready visually
    window.addEventListener('load', () => {
      // small entrance transform
      if (cakeWrap) cakeWrap.style.transform = "translateY(8px)";
      startCelebration();
    });

    return; // stop here on cake
  }

  /* ========== GIFT PAGE (gift.html) ========== */
  if (onGift) {
    // Elements
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

    // photos & letter content (same as your prior copy)
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

    let index = 0;
    // initialize photo card
    function showPhoto(i, transitionType) {
      if (i < 0 || i >= photos.length) return;
      // handle transitions based on incoming transitionType
      // remove any transition classes first
      photoCard.classList.remove('fade-in','fade-out','slide-lr-in','slide-lr-out','slide-ud-in','slide-ud-out');

      // get outgoing/incoming behavior:
      // when moving from 0->1 : fade
      // 1->2 : slide left->right (we'll animate out left, in from right)
      // 2->3 : slide up->down (out up, in from down)
      // Note: we drive transitions when NEXT is clicked (i.e., moving to i from previous index)
      photoImg.style.opacity = "0";
      setTimeout(()=> {
        photoImg.src = photos[i].src;
        photoMsg.textContent = photos[i].msg;
        progressText.textContent = `${i + 1} / ${photos.length}`;
        photoImg.style.opacity = "1";
      }, 260);
    }

    // We'll implement composite transitions depending on index change
    function doTransition(fromIdx, toIdx) {
      // ensure classes reset
      photoCard.classList.remove('fade-out','fade-in','slide-lr-out','slide-lr-in','slide-ud-out','slide-ud-in');

      if (fromIdx === 0 && toIdx === 1) {
        // fade out old, fade in new
        photoCard.classList.add('fade-out');
        setTimeout(()=> {
          showPhoto(toIdx);
          photoCard.classList.remove('fade-out');
          photoCard.classList.add('fade-in');
        }, 480);
      } else if (fromIdx === 1 && toIdx === 2) {
        // slide left out, new slides in from right
        photoCard.classList.add('slide-lr-out');
        setTimeout(()=> {
          showPhoto(toIdx);
          photoCard.classList.remove('slide-lr-out');
          photoCard.classList.add('slide-lr-in');
        }, 480);
      } else if (fromIdx === 2 && toIdx === 3) {
        // slide up out, new slides in from down
        photoCard.classList.add('slide-ud-out');
        setTimeout(()=> {
          showPhoto(toIdx);
          photoCard.classList.remove('slide-ud-out');
          photoCard.classList.add('slide-ud-in');
        }, 480);
      } else {
        // fallback: simple fade
        photoCard.classList.add('fade-out');
        setTimeout(()=> {
          showPhoto(toIdx);
          photoCard.classList.remove('fade-out');
          photoCard.classList.add('fade-in');
        }, 480);
      }
    }

    // initial state: show first photo
    function initPhotos() {
      // ensure glowy class applied
      photoCard.classList.add('glowy');
      photoImg.src = photos[0].src;
      photoMsg.textContent = photos[0].msg;
      progressText.textContent = `1 / ${photos.length}`;
    }

    // gift open -> reveal photos
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
          // last: open letter section
          seqSection.classList.add('hidden');
          letterSection.classList.remove('hidden');
        }
      });
    }

    // envelope open -> show letter with typing
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
      replayLetter.addEventListener('click', ()=> {
        typeLetter(letterText);
      });
    }

    // done on gift page
    return;
  }

})();
