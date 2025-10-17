(() => {
  // PASSWORD
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
    } else passwordError.style.display = "block";
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") passwordBtn.click();
  });

  // CONFIG: photos & messages
  const photos = [
    { src: "assets/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe.", w: 400, h: 400, x: 0, y: 0 },
    { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles.", w: 350, h: 350, x: 0, y: 0 },
    { src: "assets/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you.", w: 350, h: 250, x: 0, y: 0 },
    { src: "assets/gallery3.jpg", msg: "May your day be as lovely and unstoppable as your soul.", w: 380, h: 300, x: 0, y: 0 },
  ];

  const sequence = document.getElementById("sequence");
  const photoImg = document.getElementById("photoImg");
  const photoMsg = document.getElementById("photoMsg");
  const nextBtn = document.getElementById("nextBtn");
  const progressText = document.getElementById("progressText");
  let current = 0;

  function showPhoto(index) {
    const p = photos[index];
    photoImg.src = p.src;
    photoImg.style.objectFit = "cover";
    photoImg.style.width = p.w + "px";
    photoImg.style.height = p.h + "px";
    photoImg.style.objectPosition = `${p.x}px ${p.y}px`;
    photoMsg.textContent = p.msg;
    progressText.textContent = `${index+1} / ${photos.length}`;
  }

  nextBtn.addEventListener("click", () => {
    current++;
    if(current>=photos.length){
      sequence.classList.add("hidden");
      document.getElementById("letterSection").classList.remove("hidden");
      return;
    }
    showPhoto(current);
  });

  // show first photo after intro
  const giftWrap = document.getElementById("giftWrap");
  giftWrap.addEventListener("click", ()=>{
    document.getElementById("intro").classList.add("hidden");
    sequence.classList.remove("hidden");
    showPhoto(current);
  });

  // CROP EDITOR
  const cropEditor = document.getElementById("cropEditor");
  const cropBox = document.getElementById("cropBox");
  const cropWidthInput = document.getElementById("cropWidth");
  const cropHeightInput = document.getElementById("cropHeight");
  const cropApplyBtn = document.getElementById("cropApply");
  const cropCloseBtn = document.getElementById("cropClose");
  const cropPhotoSelect = document.getElementById("cropPhotoSelect");

  let selectedPhotoIndex = 0;
  let dragging = false;
  let offsetX=0, offsetY=0;

  function updateCropBox(){
    const p = photos[selectedPhotoIndex];
    cropBox.style.width = p.w + "px";
    cropBox.style.height = p.h + "px";
    cropBox.style.left = p.x + "px";
    cropBox.style.top = p.y + "px";
    cropWidthInput.value = p.w;
    cropHeightInput.value = p.h;
  }

  cropPhotoSelect.addEventListener("change", ()=>{
    selectedPhotoIndex = parseInt(cropPhotoSelect.value);
    updateCropBox();
  });

  cropBox.addEventListener("pointerdown", (e)=>{
    dragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    cropBox.setPointerCapture(e.pointerId);
  });
  cropBox.addEventListener("pointermove", (e)=>{
    if(!dragging) return;
    const rect = cropBox.parentElement.getBoundingClientRect();
    let left = e.clientX - rect.left - offsetX;
    let top = e.clientY - rect.top - offsetY;
    cropBox.style.left = left + "px";
    cropBox.style.top = top + "px";
  });
  cropBox.addEventListener("pointerup", (e)=>{dragging=false;});

  cropWidthInput.addEventListener("change", ()=>{
    cropBox.style.width = cropWidthInput.value + "px";
  });
  cropHeightInput.addEventListener("change", ()=>{
    cropBox.style.height = cropHeightInput.value + "px";
  });

  cropApplyBtn.addEventListener("click", ()=>{
    const p = photos[selectedPhotoIndex];
    p.w = parseInt(cropWidthInput.value);
    p.h = parseInt(cropHeightInput.value);
    p.x = parseInt(cropBox.style.left);
    p.y = parseInt(cropBox.style.top);
    if(selectedPhotoIndex === current) showPhoto(current);
    alert("Crop applied to selected photo!");
  });

  cropCloseBtn.addEventListener("click", ()=>{
    cropEditor.classList.add("hidden");
  });

  // SHOW/HIDE CROP EDITOR via Shift+P+S
  document.addEventListener("keydown",(e)=>{
    if(e.shiftKey && e.code==="KeyP"){
      document.addEventListener("keydown",function handler(ev){
        if(ev.code==="KeyS"){
          cropEditor.classList.toggle("hidden");
          updateCropBox();
          document.removeEventListener("keydown", handler);
        }
      });
    }
  });

})();
