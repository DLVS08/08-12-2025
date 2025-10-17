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

  // Allow pressing Enter to submit
  passwordInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") passwordBtn.click();
  });

  // CONFIG: photos & messages
  const photos = [
    { src: "assets/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe." },
    { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles." },
    { src: "assets/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you." },
    { src: "assets/gallery3.jpg", msg: "No wish could ever match the one I make for you — always, your happiness." }
  ];

  const letterText = Madam Ji,

I don’t know if words can ever reach the place you hold in me, but I wanted this to be something you can feel — not just read.

You’re that quiet moment between heartbeats when everything feels right. You may not have accepted my love, but I still carry you like a prayer — without asking, without expecting, only hoping that you are smiling today.

On this birthday, I celebrate you — not just for who you are, but for what you’ve made me become.  
More patient. More gentle. More real.

Happy birthday, Priye.  
— Yours, always in silence.;

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
    progressText.textContent = ${i + 1} / ${photos.length};
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

  replayLetter.addEventListener("click", () => {
    typeLetter(letterText);
  });

  // === Photo Crop Editor (Shift+P then S) ===
  const photoCard = document.querySelector('.photo-card');
  const cropOverlay = document.getElementById('cropOverlay');
  const cropHandle = document.getElementById('cropHandle');
  const cropHUD = document.getElementById('cropHUD');
  const hudWH = document.getElementById('hudWH');
  const hudXY = document.getElementById('hudXY');
  const cropExit = document.getElementById('cropExit');

  const STORAGE_KEY = 'cropV1';
  const savedSettings = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  })() || photos.map(() => ({ w: null, h: null, x: 50, y: 50 }));

  let editMode = false;
  let chordAwaitS = null;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function applySettingsFor(i){
    const s = savedSettings[i] || { w:null, h:null, x:50, y:50 };
    if (s.w && s.h) {
      photoCard.style.width = s.w + 'px';
      photoCard.style.height = s.h + 'px';
    } else {
      photoCard.style.width = '';
      photoCard.style.height = '';
    }
    photoImg.style.objectFit = 'cover';
    photoImg.style.objectPosition = `${clamp(s.x,0,100)}% ${clamp(s.y,0,100)}%`;
    if (!cropHUD.classList.contains('hidden')) {
      hudWH.textContent = `W: ${s.w || Math.round(photoCard.clientWidth)}  H: ${s.h || Math.round(photoCard.clientHeight)}`;
      hudXY.textContent = `X: ${Math.round(s.x)}%  Y: ${Math.round(s.y)}%`;
    }
  }

  // Hook into showPhoto to keep per-photo settings
  const __origShowPhoto = showPhoto;
  showPhoto = function(i){
    __origShowPhoto(i);
    if (!savedSettings[i].w || !savedSettings[i].h) {
      const r = photoCard.getBoundingClientRect();
      savedSettings[i].w = Math.round(r.width);
      savedSettings[i].h = Math.round(r.height);
    }
    applySettingsFor(i);
  };

  function enterEdit(){
    if (editMode) return;
    editMode = true;
    cropOverlay.classList.remove('hidden');
    cropHUD.classList.remove('hidden');
    const s = savedSettings[index];
    if (!s.w || !s.h){
      const r = photoCard.getBoundingClientRect();
      s.w = Math.round(r.width);
      s.h = Math.round(r.height);
    }
    applySettingsFor(index);
  }
  function exitEdit(save=true){
    if (!editMode) return;
    editMode = false;
    cropOverlay.classList.add('hidden');
    cropHUD.classList.add('hidden');
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings)); } catch {}
    }
  }

  // Key chord: Shift + P then S within 700ms
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { exitEdit(true); return; }
    if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
      chordAwaitS?.();
      let cleared = false;
      const t = setTimeout(() => { cleared = true; }, 700);
      chordAwaitS = () => { clearTimeout(t); cleared = true; };
      const onS = (ev) => {
        if (!cleared && ev.shiftKey && (ev.key === 'S' || ev.key === 's')) {
          ev.preventDefault();
          editMode ? exitEdit(true) : enterEdit();
        }
        window.removeEventListener('keydown', onS, true);
      };
      window.addEventListener('keydown', onS, true);
    }
  }, { passive: true });

  // Drag to pan (updates object-position X/Y in %)
  let panState = null;
  cropOverlay.addEventListener('pointerdown', (ev) => {
    if (ev.target === cropHandle) return;
    cropOverlay.setPointerCapture(ev.pointerId);
    panState = {
      startX: ev.clientX,
      startY: ev.clientY,
      startPosX: savedSettings[index].x,
      startPosY: savedSettings[index].y
    };
  });
  cropOverlay.addEventListener('pointermove', (ev) => {
    if (!panState) return;
    const dx = ev.clientX - panState.startX;
    const dy = ev.clientY - panState.startY;
    const cw = Math.max(1, photoCard.clientWidth);
    const ch = Math.max(1, photoCard.clientHeight);
    const nx = clamp(panState.startPosX + (dx / cw) * 100, 0, 100);
    const ny = clamp(panState.startPosY + (dy / ch) * 100, 0, 100);
    savedSettings[index].x = nx;
    savedSettings[index].y = ny;
    applySettingsFor(index);
  });
  cropOverlay.addEventListener('pointerup', () => {
    if (panState) {
      panState = null;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings)); } catch {}
    }
  });
  cropOverlay.addEventListener('pointercancel', () => { panState = null; });

  // Resize by corner handle (updates frame width/height in px)
  let resizeState = null;
  cropHandle.addEventListener('pointerdown', (ev) => {
    ev.stopPropagation();
    cropHandle.setPointerCapture(ev.pointerId);
    resizeState = {
      startX: ev.clientX,
      startY: ev.clientY,
      startW: savedSettings[index].w || Math.round(photoCard.clientWidth),
      startH: savedSettings[index].h || Math.round(photoCard.clientHeight)
    };
  });
  cropHandle.addEventListener('pointermove', (ev) => {
    if (!resizeState) return;
    const dx = ev.clientX - resizeState.startX;
    const dy = ev.clientY - resizeState.startY;
    const newW = Math.max(180, Math.round(resizeState.startW + dx));
    const newH = Math.max(180, Math.round(resizeState.startH + dy));
    savedSettings[index].w = newW;
    savedSettings[index].h = newH;
    applySettingsFor(index);
  });
  cropHandle.addEventListener('pointerup', () => {
    if (resizeState) {
      resizeState = null;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings)); } catch {}
    }
  });
  cropHandle.addEventListener('pointercancel', () => { resizeState = null; });

  // Exit button
  cropExit.addEventListener('click', () => exitEdit(true));

  // Keep HUD updated on window resize
  window.addEventListener('resize', () => { if (editMode) applySettingsFor(index); }, { passive: true });
})();
