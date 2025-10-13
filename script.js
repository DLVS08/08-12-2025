/* script.js
  Flow:
  - click gift box -> open -> show first photo
  - Next button -> cycles 4 photos with messages
  - After 4th photo -> show envelope
  - click envelope -> flap opens and letter types out
*/

(() => {
  // CONFIG: image paths and messages (edit messages to your own)
  const photos = [
    { src: "assets/images/photo1.jpg", msg: "Happy Birthday, my Priye — your smile is my sunrise." },
    { src: "assets/images/photo2.jpg", msg: "In small moments and long silences, I found you." },
    { src: "assets/images/photo3.jpg", msg: "Your laughter is the compass I follow on hard days." },
    { src: "assets/images/photo4.jpg", msg: "I celebrate you today and every day. Be happy." }
  ];

  const letterText = `Madam Ji,

I don't know exactly when I started carrying you in my quiet places — maybe it was a smile, maybe it was a day we spoke for a while. Still, somewhere between those moments, you became the best part of my ordinary.

I am not asking for anything tonight except the permission to celebrate you. If this small surprise reaches your eyes and warms a corner of your smile, then it has done what I hoped for.

Happy birthday, Priye. — Always.`;

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
    // small delay so lid animation can be seen, then show sequence
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
    // If last photo, change button text to 'Open letter'
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
      // finished photos -> show envelope area
      seqSection.classList.add("hidden");
      letterSection.classList.remove("hidden");
    }
  });

  // envelope open -> show letter with typewriter effect
  envelopeWrap.addEventListener("click", () => {
    envelopeEl.classList.add("open");
    // delay and reveal letter
    setTimeout(() => {
      letterCard.classList.remove("hidden");
      typeLetter(letterText);
    }, 500);
  });

  // Typewriter (line-by-line nicer pacing)
  function typeLetter(text) {
    letterTextEl.textContent = "";
    const speed = 18; // ms per character
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

  // initialize: hide sections (already hidden by HTML). But ensure letter text variable available
  const letterText = letterText; // already defined above as constant

})();
