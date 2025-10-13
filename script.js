/* script.js
  Flow:
  - click gift box -> open -> show first photo
  - Next button -> cycles 4 photos with messages
  - After 4th photo -> show envelope
  - click envelope -> flap opens and letter types out
*/

(() => {
  // CONFIG: your image paths and messages
  const photos = [
    { src: "assets/images/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe." },
    { src: "assets/images/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles." },
    { src: "assets/images/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you." },
    { src: "assets/images/gallery3.jpg", msg: "No wish could ever match the one I make for you — always, your happiness." }
  ];

  const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you — not just for who you are, but for what you’ve made me become.  
More patient. More gentle. More real.

Happy birthday, Priye.  
— Yours, always in silence.`;

  // elements
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

  // open gift box
  giftWrap.addEventListener("click", () => {
    giftWrap.classList.add("open");
    setTimeout(() => {
      introSection.classList.add("hidden");
      seqSection.classList.remove("hidden");
      showPhoto(0);
    }, 700);
  });

  // show photo i
  function showPhoto(i) {
    if (i < 0 || i >= photos.length) return;
    index = i;
    photoImg.src = photos[i].src;
    photoMsg.textContent = photos[i].msg;
    progressText.textContent = `${i + 1} / ${photos.length}`;
    if (i === photos.length - 1) {
      nextBtn.textContent = "Open the letter";
    } else {
      nextBtn.textContent = "Next";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (index < photos.length - 1) {
      showPhoto(index + 1);
    } else {
      seqSection.classList.add("hidden");
      letterSection.classList.remove("hidden");
    }
  });

  // envelope open -> show letter with typewriter effect
  envelopeWrap.addEventListener("click", () => {
    envelopeEl.classList.add("open");
    setTimeout(() => {
      letterCard.classList.remove("hidden");
      typeLetter(letterText);
    }, 500);
  });

  // Typewriter animation
  function typeLetter(text) {
    letterTextEl.textContent = "";
    const speed = 18;
    let i = 0;
    const t = setInterval(() => {
      letterTextEl.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
  }

  replayLetter.addEventListener("click", () => {
    typeLetter(letterText);
  });
})();
