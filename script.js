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
    } else {
      passwordError.style.display = "block";
    }
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") passwordBtn.click();
  });

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

  replayLetter.addEventListener("click", () => {
    typeLetter(letterText);
  });

  // ======= CROP EDITOR FEATURE =======
  let cropMode = false;
  let cropBox = null;
  let startX, startY, startW, startH;
  let dragging = false, resizing = false;
  const cropData = JSON.parse(localStorage.getItem("cropData") || "{}");

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

  function toggleCropMode() {
    cropMode = !cropMode;
    if (cropMode) startCropEditor();
    else endCropEditor();
  }

  function startCropEditor() {
    if (cropBox) return;
    cropBox = document.createElement("div");
    cropBox.id = "cropBox";
    cropBox.style.position = "absolute";
    cropBox.style.border = "2px dashed #ff7b9c";
    cropBox.style.zIndex = "9999";
    cropBox.style.top = "20%";
    cropBox.style.left = "20%";
    cropBox.style.width = "80%";
    cropBox.style.height = "60%";
    cropBox.style.touchAction = "none";
    cropBox.style.background = "rgba(255,255,255,0.05)";
    cropBox.style.backdropFilter = "contrast(0.8)";
    photoImg.parentElement.style.position = "relative";
    photoImg.parentElement.appendChild(cropBox);

    // Overlay label
    const label = document.createElement("div");
    label.id = "cropLabel";
    label.style.position = "absolute";
    label.style.top = "8px";
    label.style.left = "8px";
    label.style.padding = "4px 8px";
    label.style.background = "rgba(0,0,0,0.6)";
    label.style.color = "#fff";
    label.style.borderRadius = "6px";
    label.style.fontSize = "0.8rem";
    label.innerText = "Adjust crop → Drag/Resize | Press Shift+P+S to save";
    cropBox.appendChild(label);

    cropBox.addEventListener("mousedown", startDrag);
    cropBox.addEventListener("touchstart", startDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("touchmove", onDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
  }

  function endCropEditor() {
    if (!cropBox) return;
    cropBox.remove();
    cropBox = null;
  }

  function startDrag(e) {
    e.preventDefault();
    dragging = true;
    const rect = cropBox.getBoundingClientRect();
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startW = rect.width;
    startH = rect.height;
  }

  function onDrag(e) {
    if (!dragging || !cropBox) return;
    e.preventDefault();
    const moveX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
    const moveY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
    cropBox.style.left = `calc(${cropBox.style.left} + ${moveX}px)`;
    cropBox.style.top = `calc(${cropBox.style.top} + ${moveY}px)`;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
  }

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    saveCrop();
  }

  function saveCrop() {
    if (!cropBox) return;
    const imgRect = photoImg.getBoundingClientRect();
    const boxRect = cropBox.getBoundingClientRect();

    const centerX = ((boxRect.left + boxRect.width / 2 - imgRect.left) / imgRect.width) * 100;
    const centerY = ((boxRect.top + boxRect.height / 2 - imgRect.top) / imgRect.height) * 100;

    cropData[index] = { x: centerX, y: centerY };
    localStorage.setItem("cropData", JSON.stringify(cropData));
    photoImg.style.objectPosition = `${centerX}% ${centerY}%`;
  }

  // Keyboard shortcut Shift + P + S
  let pressedKeys = new Set();
  window.addEventListener("keydown", (e) => {
    pressedKeys.add(e.key.toLowerCase());
    if (pressedKeys.has("shift") && pressedKeys.has("p") && pressedKeys.has("s")) {
      toggleCropMode();
    }
  });

  window.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key.toLowerCase());
  });
})();
