(() => {
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

  const photos = [
    { src: "assets/hero.jpg", msg: "Happy Birthday, my Priye — the day you were born, love learned how to breathe." },
    { src: "assets/gallery1.jpg", msg: "You’ve been my calm in chaos, and the reason my silence smiles." },
    { src: "assets/gallery2.jpg", msg: "If I could gift you one thing today, it would be the way my heart sees you." },
    { src: "assets/gallery3.jpg", msg: "May your day be as lovely and unstoppable as your soul." },
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

  const giftWrap = document.getElementById("giftWrap");
  giftWrap.addEventListener("click", ()=>{
    document.getElementById("intro").classList.add("hidden");
    sequence.classList.remove("hidden");
    showPhoto(current);
  });
})();
