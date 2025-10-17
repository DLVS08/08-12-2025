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
    } else {
      passwordError.style.display = "block";
    }
  });
  passwordInput.addEventListener("keydown", e => { if(e.key==="Enter") passwordBtn.click(); });

  // PHOTOS
  const photos = [
    { src:"assets/hero.jpg", msg:"Happy Birthday, my Priye — the day you were born, love learned how to breathe.", w:400,h:300,x:0,y:0 },
    { src:"assets/gallery1.jpg", msg:"You’ve been my calm in chaos, and the reason my silence smiles.", w:400,h:300,x:0,y:0 },
    { src:"assets/gallery2.jpg", msg:"If I could gift you one thing today, it would be the way my heart sees you.", w:400,h:300,x:0,y:0 },
    { src:"assets/gallery3.jpg", msg:"No wish could ever match the one I make for you — always, your happiness.", w:400,h:300,x:0,y:0 }
  ];

  const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that rare calm that even storms respect. Happy Birthday.

— Yours.`;

  let photoIndex = 0;
  const sequence = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");

  const cropEditor = document.getElementById("cropEditor");
  const cropPhotoSelect = document.getElementById("cropPhotoSelect");
  const cropWidth = document.getElementById("cropWidth");
  const cropHeight = document.getElementById("cropHeight");
  const cropX = document.getElementById("cropX");
  const cropY = document.getElementById("cropY");
  const cropApply = document.getElementById("cropApply");
  const cropClose = document.getElementById("cropClose");
  const cropBox = document.getElementById("cropBox");

  function updatePhotoPreview(){
    const p = photos[photoIndex];
    photoImg.src = p.src;
    photoMsg.textContent = "";
    animateText(photoMsg,p.msg);
    progressText.textContent = `${photoIndex+1} / ${photos.length}`;

    // Update crop inputs for this photo
    cropWidth.value = p.w;
    cropHeight.value = p.h;
    cropX.value = p.x;
    cropY.value = p.y;

    applyCropBox(p);
  }

  nextBtn.addEventListener("click",()=>{
    photoIndex++;
    if(photoIndex>=photos.length){
      sequence.classList.add("hidden");
      document.getElementById("letterSection").classList.remove("hidden");
      return;
    }
    updatePhotoPreview();
  });

  // Typing animation
  function animateText(el,text){
    el.textContent="";
    let i=0;
    function step(){
      if(i<text.length){
        el.textContent += text[i++];
        setTimeout(step,45);
      }
    }
    step();
  }

  // CROP EDITOR TOGGLE
  document.addEventListener("keydown",(e)=>{
    if(e.shiftKey && e.code==="KeyP"){
      document.addEventListener("keydown",handler);
    }
  });
  function handler(e){
    if(e.shiftKey && e.code==="KeyS"){
      cropEditor.classList.toggle("hidden");
    }
    document.removeEventListener("keydown",handler);
  }

  // Apply crop
  function applyCropBox(p){
    cropBox.style.width = p.w + "px";
    cropBox.style.height = p.h + "px";
    cropBox.style.left = p.x + "px";
    cropBox.style.top = p.y + "px";
  }

  cropApply.addEventListener("click",()=>{
    const idx = parseInt(cropPhotoSelect.value);
    const p = photos[idx];
    p.w = parseInt(cropWidth.value);
    p.h = parseInt(cropHeight.value);
    p.x = parseInt(cropX.value);
    p.y = parseInt(cropY.value);

    if(idx===photoIndex){
      applyCropBox(p);
    }
  });

  cropPhotoSelect.addEventListener("change",()=>{
    const idx = parseInt(cropPhotoSelect.value);
    const p = photos[idx];
    cropWidth.value = p.w;
    cropHeight.value = p.h;
    cropX.value = p.x;
    cropY.value = p.y;
    applyCropBox(p);
  });

  cropClose.addEventListener("click",()=>{ cropEditor.classList.add("hidden"); });

  // Drag crop box
  let drag=false,offsetX=0,offsetY=0;
  cropBox.addEventListener("mousedown",e=>{
    drag=true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  document.addEventListener("mousemove",e=>{
    if(drag){
      const p = photos[parseInt(cropPhotoSelect.value)];
      let left = e.clientX - offsetX - photoImg.getBoundingClientRect().left;
      let top = e.clientY - offsetY - photoImg.getBoundingClientRect().top;
      if(left<0) left=0;
      if(top<0) top=0;
      if(left+p.w>photoImg.width) left=photoImg.width-p.w;
      if(top+p.h>photoImg.height) top=photoImg.height-p.h;
      cropBox.style.left = left+"px";
      cropBox.style.top = top+"px";
      cropX.value = Math.round(left);
      cropY.value = Math.round(top);
      p.x = Math.round(left);
      p.y = Math.round(top);
    }
  });
  document.addEventListener("mouseup",()=>{ drag=false; });

  // Initialize first photo
  document.getElementById("intro").addEventListener("click",()=>{
    document.getElementById("intro").classList.add("hidden");
    sequence.classList.remove("hidden");
    updatePhotoPreview();
  });

  // LETTER
  const envelopeWrap = document.getElementById("envelopeWrap");
  const letterCard = document.getElementById("letterCard");
  const letterTextEl = document.getElementById("letterText");
  const replayLetter = document.getElementById("replayLetter");

  envelopeWrap.addEventListener("click",()=>{
    envelopeWrap.querySelector(".envelope").classList.add("open");
    letterCard.classList.remove("hidden");
    showLetterText();
  });

  function showLetterText(){
    letterTextEl.textContent = "";
    let i=0;
    function step(){
      if(i<letterText.length){
        letterTextEl.textContent += letterText[i++];
        setTimeout(step,35);
      }
    }
    step();
  }

  replayLetter.addEventListener("click",()=>{ showLetterText(); });
})();
