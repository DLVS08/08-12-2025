(() => {
  // =====================
  // PASSWORD
  // =====================
  const passwordSection = document.getElementById("passwordSection");
  const passwordInput = document.getElementById("passwordInput");
  const passwordBtn = document.getElementById("passwordBtn");
  const passwordError = document.getElementById("passwordError");
  const correctPassword = "Angry bird";

  passwordBtn.addEventListener("click", () => {
    const entered = passwordInput.value.trim();
    if(entered === correctPassword){
      passwordSection.style.display = "none";
      document.getElementById("intro").classList.remove("hidden");
      passwordError.style.display = "none";
    } else {
      passwordError.style.display = "block";
    }
  });

  passwordInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") passwordBtn.click();
  });

  // =====================
  // PHOTOS & MESSAGES
  // =====================
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

  // =====================
  // ELEMENTS
  // =====================
  const giftWrap = document.getElementById("giftWrap");
  const seqSection = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");
  const cropEditor = document.getElementById("cropEditor");
  const cropBox = document.getElementById("cropBox");
  const cropWidth = document.getElementById("cropWidth");
  const cropHeight = document.getElementById("cropHeight");
  const cropX = document.getElementById("cropX");
  const cropY = document.getElementById("cropY");
  const cropApply = document.getElementById("cropApply");
  const cropClose = document.getElementById("cropClose");
  const letterSection = document.getElementById("letterSection");
  const envelopeWrap = document.getElementById("envelopeWrap");
  const letterCard = document.getElementById("letterCard");
  const letterTextEl = document.getElementById("letterText");
  const replayLetter = document.getElementById("replayLetter");

  let currentPhoto = 0;

  // =====================
  // GIFT BOX CLICK
  // =====================
  giftWrap.addEventListener("click", () => {
    giftWrap.classList.add("open");
    setTimeout(() => {
      document.getElementById("intro").classList.add("hidden");
      seqSection.classList.remove("hidden");
      showPhoto(currentPhoto);
    }, 1200);
  });

  // =====================
  // SHOW PHOTO
  // =====================
  function showPhoto(index){
    const p = photos[index];
    photoImg.src = p.src;
    photoMsg.textContent = p.msg;
    progressText.textContent = `${index+1} / ${photos.length}`;
  }

  nextBtn.addEventListener("click", () => {
    currentPhoto++;
    if(currentPhoto >= photos.length){
      seqSection.classList.add("hidden");
      letterSection.classList.remove("hidden");
    } else {
      showPhoto(currentPhoto);
    }
  });

  // =====================
  // ENVELOPE CLICK
  // =====================
  envelopeWrap.addEventListener("click", () => {
    envelopeWrap.classList.add("open");
    setTimeout(() => {
      letterCard.classList.remove("hidden");
      letterTextEl.textContent = letterText;
    }, 600);
  });

  replayLetter.addEventListener("click", () => {
    letterCard.classList.add("hidden");
    setTimeout(() => {
      letterCard.classList.remove("hidden");
      letterTextEl.textContent = letterText;
    }, 100);
  });

  // =====================
  // CROP EDITOR SECRET KEY: Shift+P+S
  // =====================
  let keys = {};
  document.addEventListener("keydown", e => {
    keys[e.key] = true;
    if(keys['Shift'] && keys['P'] && keys['S']){
      cropEditor.classList.toggle("hidden");
      keys = {};
    }
  });
  document.addEventListener("keyup", e => { keys[e.key] = false; });

  // TODO: add cropBox drag, resize, apply logic if needed
})();
