(() => {
  // ===== PASSWORD =====
  const passwordSection = document.getElementById("passwordSection");
  const passwordInput = document.getElementById("passwordInput");
  const passwordBtn = document.getElementById("passwordBtn");
  const passwordError = document.getElementById("passwordError");
  const correctPassword = "Angry bird";

  passwordBtn.addEventListener("click", () => {
    const entered = passwordInput.value.trim();
    if (entered === correctPassword) {
      passwordSection.style.display = "none";
      document.getElementById("intro").classList.remove("hidden");
      passwordError.style.display = "none";
    } else {
      passwordError.style.display = "block";
    }
  });

  passwordInput.addEventListener("keydown", e => {
    if (e.key === "Enter") passwordBtn.click();
  });

  // ===== PHOTOS CONFIG =====
  // Now includes objectFit, objectPosition, width%, height% for manual control
  const photos = [
    { 
      src: "assets/hero.jpg", 
      msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe.",
      objectFit: "cover",
      objectPosition: "50% 50%",
      width: "120%",   // zoom horizontally
      height: "120%"   // zoom vertically
    },
    { 
      src: "assets/gallery1.jpg", 
      msg: "You’ve been my calm in chaos, and the reason my silence smiles.",
      objectFit: "cover",
      objectPosition: "50% 40%",
      width: "110%",
      height: "110%"
    },
    { 
      src: "assets/gallery2.jpg", 
      msg: "If I could gift you one thing today, it would be the way my heart sees you.",
      objectFit: "cover",
      objectPosition: "60% 50%",
      width: "130%",
      height: "130%"
    },
    { 
      src: "assets/gallery3.jpg", 
      msg: "No wish could ever match the one I make for you — always, your happiness.",
      objectFit: "cover",
      objectPosition: "50% 60%",
      width: "125%",
      height: "125%"
    }
  ];

  const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you — not just for who you are, but for what you’ve made me become.  
More patient. More gentle. More real.

Happy birthday, Priye.  
— Yours, always in silence.`;

  // ===== DOM ELEMENTS =====
  const giftWrap = document.getElementById("giftWrap");
  const introSection = document.getElementById("intro");
  const seqSection = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");
  const letterSection = document.getElementById("letterSection");
  const envelopeWrap = document.getElementById("envelopeWrap");
  const envelopeEl = envelopeWrap.querySelector(".envelope");
  const letterCard = document.getElementById("letterCard");
  const letterTextEl = document.getElementById("letterText");
  const replayLetter = document.getElementById("replayLetter");

  let index = 0;

  // ===== GIFT BOX OPEN =====
  giftWrap.addEventListener("click", () => {
    giftWrap.classList.add("open");
    setTimeout(() => {
      introSection.classList.add("hidden");
      seqSection.classList.remove("hidden");
      showPhoto(0);
    }, 700);
  });

  function showPhoto(i) {
    if (i < 0 || i >= photos.length) return;
    index = i;
    const photo = photos[i];
    photoImg.src = photo.src;
    photoMsg.textContent = photo.msg;
    progressText.textContent = `${i + 1} / ${photos.length}`;
    nextBtn.textContent = (i === photos.length - 1) ? "Open the letter" : "Next";

    // Apply manual crop / alignment / zoom
    photoImg.style.objectFit = photo.objectFit;
    photoImg.style.objectPosition = photo.objectPosition;
    photoImg.style.width = photo.width;
    photoImg.style.height = photo.height;
  }

  nextBtn.addEventListener("click", () => {
    if (index < photos.length - 1) {
      showPhoto(index + 1);
    } else {
      seqSection.classList.add("hidden");
      letterSection.classList.remove("hidden");
    }
  });

  // ===== LETTER =====
  envelopeWrap.addEventListener("click", () => {
    envelopeEl.classList.add("open");
    setTimeout(() => {
      letterCard.classList.remove("hidden");
      typeLetter(letterText);
    }, 500);
  });

  function typeLetter(text) {
    letterTextEl.textContent = "";
    let i = 0;
    const t = setInterval(() => {
      letterTextEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(t);
    }, 18);
  }

  replayLetter.addEventListener("click", () => typeLetter(letterText));

})();
