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
    photoImg.src = photos[i].src;
    photoMsg.textContent = photos[i].msg;
    progressText.textContent = `${i + 1} / ${photos.length}`;
    nextBtn.textContent = (i === photos.length - 1) ? "Open the letter" : "Next";
    restoreCrop(i);
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

  // ===== CROP EDITOR =====
  const cropPreview = document.getElementById("cropPreview");
  const cropData = JSON.parse(localStorage.getItem("cropData") || "{}");
  let cropBox = null;
  let cropMode = false;
  let dragging = false, resizing = false;
  let dragStartX, dragStartY, dragStartLeft, dragStartTop;
  let resizeStartX, resizeStartY, resizeStartW, resizeStartH;

  function restoreCrop(i) {
    const data = cropData[i];
    if (data) {
      photoImg.style.objectPosition = `${data.x}% ${data.y}%`;
      photoImg.style.objectFit = "cover";
    } else {
      photoImg.style.objectPosition = "50% 50%";
      photoImg.style.objectFit = "cover";
    }
  }

  function ensureCropBox() {
    if (!cropBox) {
      cropBox = document.createElement("div");
      cropBox.id = "cropBox";
      cropBox.style.position = "absolute";
      cropBox.style.border = "3px dashed #ff7b9c";
      cropBox.style.background = "rgba(255,122,146,0.05)";
      cropBox.style.cursor = "move";
      cropBox.style.top = "20%";
      cropBox.style.left = "20%";
      cropBox.style.width = "60%";
      cropBox.style.height = "50%";
      cropBox.style.zIndex = "999";
      cropBox.style.display = "flex";
      cropBox.style.alignItems = "flex-end";
      cropBox.style.justifyContent = "flex-end";
      cropPreview.appendChild(cropBox);

      // RESIZE HANDLE
      const handle = document.createElement("div");
      handle.className = "resize-handle";
      cropBox.appendChild(handle);
      handle.addEventListener("mousedown", startResize);
      handle.addEventListener("touchstart", startResize, {passive:false});

      // DRAGGING
      cropBox.addEventListener("mousedown", startDrag);
      cropBox.addEventListener("touchstart", startDrag, {passive:false});

      // SET BUTTON
      const setBtn = document.createElement("button");
      setBtn.textContent = "Set Crop";
      setBtn.className = "btn";
      setBtn.style.position = "absolute";
      setBtn.style.top = "8px";
      setBtn.style.right = "8px";
      setBtn.style.zIndex = "1000";
      cropBox.appendChild(setBtn);
      setBtn.addEventListener("click", saveCrop);
    }
  }

  // ===== DRAG =====
  function startDrag(e) {
    e.preventDefault();
    ensureCropBox();
    dragging = true;
    dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartLeft = cropBox.offsetLeft;
    dragStartTop = cropBox.offsetTop;
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onDrag, {passive:false});
    window.addEventListener("touchend", endDrag);
  }

  function onDrag(e) {
    if (!dragging) return;
    e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    let dx = x - dragStartX;
    let dy = y - dragStartY;
    let newLeft = dragStartLeft + dx;
    let newTop = dragStartTop + dy;

    // Boundaries
    newLeft = Math.max(0, Math.min(cropPreview.clientWidth - cropBox.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(cropPreview.clientHeight - cropBox.offsetHeight, newTop));

    cropBox.style.left = newLeft + "px";
    cropBox.style.top = newTop + "px";
  }

  function endDrag() { dragging = false; }

  // ===== RESIZE =====
  function startResize(e) {
    e.stopPropagation();
    e.preventDefault();
    resizing = true;
    resizeStartX = e.touches ? e.touches[0].clientX : e.clientX;
    resizeStartY = e.touches ? e.touches[0].clientY : e.clientY;
    resizeStartW = cropBox.offsetWidth;
    resizeStartH = cropBox.offsetHeight;
    window.addEventListener("mousemove", onResize);
    window.addEventListener("mouseup", endResize);
    window.addEventListener("touchmove", onResize, {passive:false});
    window.addEventListener("touchend", endResize);
  }

  function onResize(e) {
    if (!resizing) return;
    e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    let newW = resizeStartW + (x - resizeStartX);
    let newH = resizeStartH + (y - resizeStartY);

    // Minimum size
    newW = Math.max(50, Math.min(cropPreview.clientWidth - cropBox.offsetLeft, newW));
    newH = Math.max(50, Math.min(cropPreview.clientHeight - cropBox.offsetTop, newH));

    cropBox.style.width = newW + "px";
    cropBox.style.height = newH + "px";
  }

  function endResize() { resizing = false; }

  // ===== SAVE CROP =====
  function saveCrop() {
    if (!cropBox) return;
    const previewRect = cropPreview.getBoundingClientRect();
    const boxRect = cropBox.getBoundingClientRect();

    const centerX = ((boxRect.left + boxRect.width/2 - previewRect.left) / previewRect.width) * 100;
    const centerY = ((boxRect.top + boxRect.height/2 - previewRect.top) / previewRect.height) * 100;

    cropData[index] = { x: centerX, y: centerY };
    localStorage.setItem("cropData", JSON.stringify(cropData));

    photoImg.style.objectPosition = `${centerX}% ${centerY}%`;
    photoImg.style.objectFit = "cover";
    alert("Crop saved for this photo!");
  }

  // ===== TOGGLE CROP MODE =====
  function toggleCropMode() {
    cropMode = !cropMode;
    if (cropMode) {
      ensureCropBox();
      cropBox.style.display = "flex"; // make visible
    } else {
      if(cropBox) cropBox.remove();
      cropBox = null;
    }
  }

  // ===== KEYBOARD SHORTCUT =====
  let pressedKeys = new Set();
  window.addEventListener("keydown", e => {
    pressedKeys.add(e.key.toLowerCase());
    if (pressedKeys.has("shift") && pressedKeys.has("p") && pressedKeys.has("s")) {
      toggleCropMode();
    }
  });

  window.addEventListener("keyup", e => pressedKeys.delete(e.key.toLowerCase()));

})();
