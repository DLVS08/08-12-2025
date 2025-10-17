(() => {
  // PASSWORD
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
    } else { passwordError.style.display = "block"; }
  });
  passwordInput.addEventListener("keydown", (e) => { if(e.key === "Enter") passwordBtn.click(); });

  // CONFIG: photos & messages
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

  function showPhoto(i) {
    if (i < 0 || i >= photos.length) return;
    index = i;
    photoImg.src = photos[i].src;
    photoMsg.textContent = photos[i].msg;
    progressText.textContent = `${i + 1} / ${photos.length}`;
    nextBtn.textContent = (i === photos.length - 1) ? "Open the letter" : "Next";
  }

  nextBtn.addEventListener("click", () => {
    if (index < photos.length - 1) {
      showPhoto(index + 1);
    } else {
      seqSection.classList.add("hidden");
      letterSection.classList.remove("hidden");
    }
  });

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

  replayLetter.addEventListener("click", () => { typeLetter(letterText); });

  // =====================
  // PHOTO CROP EDITOR LOGIC
  // =====================
  const cropEditor = document.getElementById("cropEditor");
  const cropBox = document.getElementById("cropBox");
  const cropWidthInp = document.getElementById("cropWidth");
  const cropHeightInp = document.getElementById("cropHeight");
  const cropXInp = document.getElementById("cropX");
  const cropYInp = document.getElementById("cropY");
  const cropApply = document.getElementById("cropApply");
  const cropClose = document.getElementById("cropClose");

  let cropData = { x:0, y:0, w:photoImg.clientWidth, h:photoImg.clientHeight };

  function updateCropBox(){
    cropBox.style.width = cropData.w + "px";
    cropBox.style.height = cropData.h + "px";
    cropBox.style.left = cropData.x + "px";
    cropBox.style.top = cropData.y + "px";
    cropWidthInp.value = cropData.w;
    cropHeightInp.value = cropData.h;
    cropXInp.value = Math.round((cropData.x/photoImg.clientWidth)*100);
    cropYInp.value = Math.round((cropData.y/photoImg.clientHeight)*100);
  }

  // Trigger editor: Shift+P+S
  let keysPressed = {};
  document.addEventListener("keydown", (e)=>{
    keysPressed[e.key.toLowerCase()] = true;
    if(keysPressed["shift"] && keysPressed["p"] && keysPressed["s"]){
      cropEditor.classList.toggle("hidden");
      // initialize box
      cropData = { x:0, y:0, w:photoImg.clientWidth, h:photoImg.clientHeight };
      updateCropBox();
    }
  });
  document.addEventListener("keyup",(e)=>{ keysPressed[e.key.toLowerCase()]=false; });

  // Make crop box draggable
  let dragging = false, offsetX=0, offsetY=0;
  cropBox.addEventListener("mousedown",(e)=>{
    dragging=true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  document.addEventListener("mousemove",(e)=>{
    if(!dragging) return;
    const rect = cropBox.parentElement.getBoundingClientRect();
    cropData.x = Math.max(0, Math.min(rect.width - cropData.w, e.clientX - rect.left - offsetX));
    cropData.y = Math.max(0, Math.min(rect.height - cropData.h, e.clientY - rect.top - offsetY));
    updateCropBox();
  });
  document.addEventListener("mouseup",()=>{ dragging=false; });

  // Apply button
  cropApply.addEventListener("click", ()=>{
    const Xpercent = Math.min(100, Math.max(0, cropXInp.value));
    const Ypercent = Math.min(100, Math.max(0, cropYInp.value));
    photoImg.style.objectPosition = `${Xpercent}% ${Ypercent}%`;
    photoImg.style.width = cropWidthInp.value + "px";
    photoImg.style.height = cropHeightInp.value + "px";
  });
  // Close editor
  cropClose.addEventListener("click", ()=>{ cropEditor.classList.add("hidden"); });
})();
