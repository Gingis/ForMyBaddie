/* =========================================================
   A Bouquet For You — script.js
   Handles: screen transitions, typing animation, flower
   interactions, ambient floating effects, love letter,
   day/night mode, and the 15s final surprise + confetti.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. TYPING ANIMATION (welcome headline)
     --------------------------------------------------- */
  const typingText = document.getElementById('typingText');
  const typingCursor = document.getElementById('typingCursor');
  const fullHeadline = 'Someone prepared something special for you 🌸';
  let typeIndex = 0;

  function typeHeadline(){
    if (typeIndex <= fullHeadline.length){
      typingText.textContent = fullHeadline.slice(0, typeIndex);
      typeIndex++;
      setTimeout(typeHeadline, 42);
    } else {
      // stop the blinking cursor from feeling stuck once done
      typingCursor.style.animationDuration = '1.2s';
    }
  }
  typeHeadline();

  /* ---------------------------------------------------
     2. SCREEN TRANSITION: Welcome -> Bouquet
     --------------------------------------------------- */
  const welcomeScreen = document.getElementById('welcomeScreen');
  const bouquetScreen = document.getElementById('bouquetScreen');
  const openBtn = document.getElementById('openBtn');

  let bouquetOpened = false;

  openBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hide');
    setTimeout(() => {
      bouquetScreen.classList.add('show');
      if (!bouquetOpened){
        bouquetOpened = true;
        startFinalSurpriseTimer();   // 15s countdown begins once bouquet is shown
      }
    }, 350);
  });

  /* ---------------------------------------------------
     3. FLOWER INTERACTION (click to enlarge + show info)
     --------------------------------------------------- */
  const flowerSlots = document.querySelectorAll('.flower-slot[data-flower]');
  const flowerPopup = document.getElementById('flowerPopup');
  const popupClose = document.getElementById('popupClose');
  const popupName = document.getElementById('popupFlowerName');
  const popupMessage = document.getElementById('popupFlowerMessage');
  const popupPreview = document.getElementById('popupFlowerPreview');

  flowerSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      // toggle "active" enlarge state on the clicked flower, reset others
      flowerSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');

      const name = slot.dataset.name;
      const message = slot.dataset.message;
      const flowerHTML = slot.querySelector('.flower').outerHTML;

      popupName.textContent = name;
      popupMessage.textContent = message;
      popupPreview.innerHTML = flowerHTML;

      flowerPopup.classList.add('show');
      spawnSparkleBurst(slot);
    });
  });

  function closeFlowerPopup(){
    flowerPopup.classList.remove('show');
    flowerSlots.forEach(s => s.classList.remove('active'));
  }
  popupClose.addEventListener('click', closeFlowerPopup);
  flowerPopup.addEventListener('click', (e) => {
    if (e.target === flowerPopup) closeFlowerPopup();
  });

  /* ---------------------------------------------------
     4. LOVE LETTER
     --------------------------------------------------- */
  const letterBtn = document.getElementById('letterBtn');
  const letterOverlay = document.getElementById('letterOverlay');
  const letterClose = document.getElementById('letterClose');
  const letterBody = document.getElementById('letterBody');

  const letterMessage = `I just wanted to brighten your day.
Thank you for being such an amazing friend.
I hope this bouquet makes you smile.
Keep shining and never forget how appreciated you are.
Have a wonderful day! 🌸`;

  let letterTyped = false;

  letterBtn.addEventListener('click', () => {
    letterOverlay.classList.add('show');
    if (!letterTyped){
      letterTyped = true;
      typeLetter();
    }
  });

  function typeLetter(){
    let i = 0;
    letterBody.textContent = '';
    function step(){
      if (i <= letterMessage.length){
        letterBody.textContent = letterMessage.slice(0, i);
        i++;
        setTimeout(step, 22);
      }
    }
    step();
  }

  function closeLetter(){ letterOverlay.classList.remove('show'); }
  letterClose.addEventListener('click', closeLetter);
  letterOverlay.addEventListener('click', (e) => {
    if (e.target === letterOverlay) closeLetter();
  });

  /* ---------------------------------------------------
     5. DAY / NIGHT TOGGLE
     --------------------------------------------------- */
  const modeToggle = document.getElementById('modeToggle');
  const modeIcon = modeToggle.querySelector('.mode-icon');

  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    modeIcon.textContent = isNight ? '☀️' : '🌙';
  });

  /* ---------------------------------------------------
     6. AMBIENT FLOATING EFFECTS
     petals, sparkles, floating hearts, occasional butterflies
     --------------------------------------------------- */
  const ambientLayer = document.getElementById('ambientLayer');
  const petalColors = ['#E6A9C0', '#F6D3DE', '#CDB9E6', '#F7DCE5'];

  function spawnPetal(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 8;
    const drift = (Math.random() * 120 - 60) + 'px';
    const size = 8 + Math.random() * 10;
    petal.style.left = left + 'vw';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.setProperty('--drift', drift);
    petal.style.animationDuration = duration + 's';
    ambientLayer.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 200);
  }

  function spawnSparkle(){
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (Math.random() * 100) + 'vw';
    sparkle.style.top = (Math.random() * 100) + 'vh';
    const duration = 2 + Math.random() * 2;
    sparkle.style.animationDuration = duration + 's';
    ambientLayer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), duration * 1000 + 200);
  }

  function spawnHeart(){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['💗','💕','🩷'][Math.floor(Math.random() * 3)];
    heart.style.left = (Math.random() * 100) + 'vw';
    const duration = 9 + Math.random() * 6;
    const drift = (Math.random() * 60 - 30) + 'px';
    heart.style.setProperty('--drift', drift);
    heart.style.animationDuration = duration + 's';
    ambientLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  function spawnButterfly(){
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.textContent = '🦋';
    butterfly.style.top = (15 + Math.random() * 55) + 'vh';
    const duration = 9 + Math.random() * 4;
    butterfly.style.animationDuration = duration + 's';
    ambientLayer.appendChild(butterfly);
    setTimeout(() => butterfly.remove(), duration * 1000 + 200);
  }

  // small celebratory sparkle burst around a clicked flower
  function spawnSparkleBurst(slot){
    const rect = slot.getBoundingClientRect();
    for (let i = 0; i < 8; i++){
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() * 60 - 30)) + 'px';
      sparkle.style.top = (rect.top + rect.height / 2 + (Math.random() * 60 - 30)) + 'px';
      sparkle.style.animationDuration = '1.1s';
      ambientLayer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1300);
    }
  }

  // ambient intervals — gentle, not overwhelming
  setInterval(spawnPetal, 1400);
  setInterval(spawnSparkle, 900);
  setInterval(spawnHeart, 3200);
  setInterval(spawnButterfly, 11000);

  // seed a few immediately so the page doesn't feel empty on load
  for (let i = 0; i < 4; i++) setTimeout(spawnPetal, i * 300);
  for (let i = 0; i < 6; i++) setTimeout(spawnSparkle, i * 250);

  /* ---------------------------------------------------
     7. FINAL SURPRISE (15s after bouquet opens)
     brighter blooms + confetti + closing message
     --------------------------------------------------- */
  const finalSurprise = document.getElementById('finalSurprise');
  const bouquetStage = document.querySelector('.bouquet-stage');

  function startFinalSurpriseTimer(){
    setTimeout(() => {
      bouquetStage.classList.add('bright');
      finalSurprise.classList.add('show');
      launchConfetti();

      // let the message linger, then fade so the page stays usable
      setTimeout(() => {
        finalSurprise.classList.remove('show');
      }, 5000);
    }, 15000);
  }

  /* ---------------------------------------------------
     8. CONFETTI (canvas-based, vanilla JS)
     --------------------------------------------------- */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  const confettiColors = ['#E6A9C0', '#CDB9E6', '#F6D3DE', '#E9C48D', '#9FBB8E', '#FBF6EE'];

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function launchConfetti(){
    const pieces = [];
    const count = window.innerWidth < 600 ? 80 : 150;

    for (let i = 0; i < count; i++){
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });
    }

    let frame = 0;
    const maxFrames = 320; // roughly ~5.3s at 60fps

    function animateConfetti(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      pieces.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (frame < maxFrames){
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animateConfetti);
  }

  /* ---------------------------------------------------
     9. Prevent double-tap zoom quirks on mobile for buttons
     --------------------------------------------------- */
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('touchend', (e) => { /* allow native click; no-op guard */ }, { passive: true });
  });

});