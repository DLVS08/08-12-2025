(() => {
  // PASSWORD
  const passwordSection = document.getElementById("passwordSection");
  const passwordInput = document.getElementById("passwordInput");
  const passwordBtn = document.getElementById("passwordBtn");
  const passwordError = document.getElementById("passwordError");
  const correctPassword = "Angry bird";

  passwordBtn.addEventListener("click", () => {
    if(passwordInput.value.trim()===correctPassword){
      passwordSection.style.display="none";
      document.getElementById("intro").classList.remove("hidden");
      passwordError.style.display="none";
    } else passwordError.style.display="block";
  });
  passwordInput.addEventListener("keydown", e => { if(e.key==="Enter") passwordBtn.click(); });

  // PHOTOS & MESSAGES
  const photos = [
    { src: "assets/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe.", w:400,h:300,x:0,y:0 },
    { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles.", w:350,h:250,x:0,y:0 },
    { src: "assets/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you.", w:400,h:300,x:0,y:0 },
    { src: "assets/gallery3.jpg", msg: "No wish could ever match the one I make for you — always, your happiness.", w:300,h:300,x:0,y:0 }
  ];

  const letterText = `Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you — not just for who you are, but for what you’ve made me become.  
More patient. More gentle. More real.

Happy birthday, Priye.  
— Yours.`;

  const giftWrap = document.getElementById("giftWrap");
  const introSection = document.getElementById("intro");
  const sequence = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");

  // CROP ELEMENTS
  const cropEditor = document.getElementById("cropEditor");
  const cropPhotoSelect = document.getElementById("cropPhotoSelect");
  const cropWidth = document.getElementById("cropWidth");
  const cropHeight = document.getElementById("cropHeight");
  const cropApply = document.getElementById("cropApply");
  const cropClose = document.getElementById("cropClose");
  const cropBox = document.getElementById("cropBox");

  let photoIndex=0;

  function showPhoto(i){
    photoIndex=i;
    const p = photos[i];
    photoImg.src=p.src;
    animateText(photoMsg,p.msg);
    progressText.textContent=`${i+1} / ${photos.length}`;

    // update crop inputs
    cropPhotoSelect.value=i;
    cropWidth.value=p.w;
    cropHeight.value=p.h;
    applyCropBox(p);
  }

  function animateText(el,text){
    el.textContent="";
    let idx=0;
    function step(){
      if(idx<text.length){
        el.textContent+=text[idx++];
        setTimeout(step,45);
      }
    }
    step();
  }

  nextBtn.addEventListener("click",()=>{
    if(photoIndex<photos.length-1) showPhoto(photoIndex+1);
    else{
      sequence.classList.add("hidden");
      document.getElementById("letterSection").classList.remove("hidden");
    }
  });

  giftWrap.addEventListener("click",()=>{
    giftWrap.classList.add("open");
    setTimeout(()=>{
      introSection.classList.add("hidden");
      sequence.classList.remove("hidden");
      showPhoto(0);
    },1200);
  });

  // CROP BOX LOGIC
  let dragging=false, offset={x:0,y:0};
  cropBox.style.width="100px"; cropBox.style.height="100px"; cropBox.style.left="0px"; cropBox.style.top="0px";

  function applyCropBox(p){
    cropBox.style.width=p.w+"px";
    cropBox.style.height=p.h+"px";
    cropBox.style.left=p.x+"px";
    cropBox.style.top=p.y+"px";
  }

  cropBox.addEventListener("mousedown", e=>{
    dragging=true;
    offset.x=e.offsetX;
    offset.y=e.offsetY;
    e.preventDefault();
  });
  document.addEventListener("mouseup",()=>dragging=false);
  document.addEventListener("mousemove", e=>{
    if(dragging){
      let rect=photoImg.getBoundingClientRect();
      let x=e.clientX-rect.left-offset.x;
      let y=e.clientY-rect.top-offset.y;
      x=Math.max(0,Math.min(rect.width-parseInt(cropBox.style.width),x));
      y=Math.max(0,Math.min(rect.height-parseInt(cropBox.style.height),y));
      cropBox.style.left=x+"px";
      cropBox.style.top=y+"px";
    }
  });

  cropApply.addEventListener("click",()=>{
    const i=parseInt(cropPhotoSelect.value);
    photos[i].w=parseInt(cropWidth.value);
    photos[i].h=parseInt(cropHeight.value);
    photos[i].x=parseInt(cropBox.style.left);
    photos[i].y=parseInt(cropBox.style.top);
    applyCropBox(photos[i]);
  });

  cropClose.addEventListener("click",()=>cropEditor.classList.add("hidden"));
  cropPhotoSelect.addEventListener("change",()=>{
    const i=parseInt(cropPhotoSelect.value);
    cropWidth.value=photos[i].w;
    cropHeight.value=photos[i].h;
    applyCropBox(photos[i]);
  });

  // Toggle crop editor with Shift+P+S
  document.addEventListener("keydown", e=>{
    if(e.shiftKey && e.code==="KeyP"){document.addEventListener("keydown", checkS);}
  });
  function checkS(e){ if(e.code==="KeyS"){cropEditor.classList.toggle("hidden"); document.removeEventListener("keydown", checkS);}}

  // LETTER
  const envelopeWrap=document.getElementById("envelopeWrap");
  const envelope=document.querySelector(".envelope");
  const letterCard=document.getElementById("letterCard");
  const letterTextEl=document.getElementById("letterText");
  const replayLetter=document.getElementById("replayLetter");

  envelopeWrap.addEventListener("click",()=>{
    envelope.classList.add("open");
    setTimeout(()=>{letterCard.classList.remove("hidden"); animateText(letterTextEl,letterText);},600);
  });

  replayLetter.addEventListener("click",()=>animateText(letterTextEl,letterText));
})();
