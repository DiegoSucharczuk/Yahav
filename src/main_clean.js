import './style.css'
import BirthdayMusicPlayer from './simpleMusicPlayer.js'
import PhotoManager from './photoManager.js'

// יצירת נגן מוזיקה ומנהל תמונות
const musicPlayer = new BirthdayMusicPlayer();
const photoManager = new PhotoManager();

// ברכות מיוחדות ליהב
const birthdayWishes = [
  "🎉 יום הולדת שמח לבן הכי מיוחד שיש! 🎉",
  "🌟 יהב, שנת 22 תהיה מלאה בהפתעות נפלאות! 🌟",
  "🎂 עוד שנה של חיוכים, שמחה ואושר! 🎂",
  "🎁 מאחלים לך שכל החלומות שלך יתגשמו! 🎁",
  "✨ יהב יקר, שתמיד תמצא סיבות לחגוג! ✨",
  "🎈 22 זה רק ההתחלה של דברים גדולים! 🎈",
  "💫 שנה חדשה מלאה בהזדמנויות ובאתגרים מעניינים! 💫",
  "🎊 יום הולדת שמח לבן הכי נפלא בעולם! 🎊",
  "🌈 שהשנה הזאת תביא איתה צבעים חדשים לחיים! 🌈",
  "🎭 יהב, תמשיך לחייך ולהפיץ אושר סביבך! 🎭"
];

let currentWishIndex = 0;
let celebrationMode = false;
let musicPlaying = false;
let photoRotationActive = true;

// אתחול האפליקציה
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupWishRotation();
  setupPhotoManager();
  setupEventListeners();
  startFloatingAnimation();
  createBirthdayCard();
}

// סיבוב ברכות
function setupWishRotation() {
  setInterval(() => {
    if (!celebrationMode) {
      currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;
      updateMainTitle();
    }
  }, 3000);
}

function updateMainTitle() {
  const titleElement = document.querySelector('.main-title');
  if (titleElement) {
    titleElement.style.opacity = '0';
    setTimeout(() => {
      titleElement.textContent = birthdayWishes[currentWishIndex];
      titleElement.style.opacity = '1';
    }, 300);
  }
}

// הקמת מנהל התמונות
function setupPhotoManager() {
  const photoContainer = document.getElementById('photoContainer');
  if (photoContainer) {
    photoManager.initialize(photoContainer);
  }
}

// מאזיני אירועים
function setupEventListeners() {
  // כפתור חגיגה
  document.getElementById('celebrateBtn').addEventListener('click', triggerCelebration);
  
  // כפתור מוזיקה
  document.getElementById('musicBtn').addEventListener('click', toggleMusic);
  
  // כפתור הפתעה
  document.getElementById('surpriseBtn').addEventListener('click', triggerSurprise);
  
  // כפתור החלפת תמונה
  document.getElementById('changePhotoBtn').addEventListener('click', async () => {
    const photoContainer = document.getElementById('photoContainer');
    await photoManager.changeImage(photoContainer);
  });
  
  // כפתור עצירת/התחלת סיבוב תמונות
  document.getElementById('toggleRotationBtn').addEventListener('click', () => {
    const toggleBtn = document.getElementById('toggleRotationBtn');
    if (photoRotationActive) {
      photoManager.stopRotation();
      photoRotationActive = false;
      toggleBtn.textContent = '▶️ התחל סיבוב';
    } else {
      photoManager.startRotation();
      photoRotationActive = true;
      toggleBtn.textContent = '⏸️ עצור סיבוב';
    }
  });
}

// אנימציה מעופפת
function startFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating-elements > *');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// יצירת כרטיס יום הולדת
function createBirthdayCard() {
  const app = document.getElementById('app');
  
  const cardHTML = `
    <div class="birthday-card">
      <header class="card-header">
        <h1 class="main-title">${birthdayWishes[0]}</h1>
        <p class="subtitle">מאחלים ליהב שנה מדהימה!</p>
      </header>

      <section class="age-celebration">
        <div class="age-number">22</div>
        <div class="age-text">שנים של אושר!</div>
      </section>

      <section class="photo-section">
        <div class="photo-frame">
          <div class="photo-placeholder-content" id="photoContainer">
            <div class="placeholder-icon">📸</div>
            <div class="placeholder-text">
              <div>תמונות של יהב</div>
              <div class="placeholder-subtext">טוען תמונות...</div>
            </div>
          </div>
        </div>
        <div class="photo-controls">
          <button class="change-photo-btn" id="changePhotoBtn">
            🔄 תמונה אחרת
          </button>
          <button class="toggle-rotation-btn" id="toggleRotationBtn">
            ⏸️ עצור סיבוב
          </button>
        </div>
      </section>

      <!-- כפתורי אינטראקציה -->
      <section class="interaction-section">
        <button class="celebrate-btn" id="celebrateBtn">🎊 בואו נחגוג! 🎊</button>
        <button class="music-btn" id="musicBtn">🎵 מוזיקה 🎵</button>
        <button class="surprise-btn" id="surpriseBtn">🎁 הפתעה! 🎁</button>
      </section>

      <!-- אלמנטים מעופפים -->
      <div class="floating-elements">
        <div class="balloon balloon-1">🎈</div>
        <div class="balloon balloon-2">🎈</div>
        <div class="confetti confetti-1">🎊</div>
        <div class="confetti confetti-2">🎉</div>
        <div class="star star-1">⭐</div>
        <div class="star star-2">✨</div>
      </div>
    </div>

    <div class="background-animation"></div>
  `;
  
  app.innerHTML = cardHTML;
}

// חגיגה!
function triggerCelebration() {
  celebrationMode = true;
  const celebrateBtn = document.getElementById('celebrateBtn');
  const originalText = celebrateBtn.textContent;
  
  // אנימציה לכפתור
  celebrateBtn.style.transform = 'scale(1.2)';
  celebrateBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd93d, #4ecdc4, #45b7d1)';
  celebrateBtn.textContent = '🎊 חוגגים! 🎊';
  
  // יצירת חלקיקים מעופפים
  createCelebrationParticles();
  
  // ברכה מיוחדת
  showCelebrationMessage();
  
  // החזרה למצב רגיל
  setTimeout(() => {
    celebrateBtn.style.transform = 'scale(1)';
    celebrateBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
    celebrateBtn.textContent = originalText;
    celebrationMode = false;
  }, 3000);
}

// מוזיקה פשוטה ונקייה
async function toggleMusic() {
  const musicBtn = document.getElementById('musicBtn');
  
  if (!musicPlaying) {
    musicBtn.textContent = '🎵 טוען... 🎵';
    musicBtn.disabled = true;
    
    const result = await musicPlayer.play();
    
    if (result) {
      musicPlaying = true;
      musicBtn.textContent = '🔇 עצור מוזיקה 🔇';
      musicBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
      playBirthdayAnimation();
    } else {
      musicBtn.textContent = '🎵 מוזיקה 🎵';
    }
    
    musicBtn.disabled = false;
  } else {
    musicPlayer.stop();
    musicPlaying = false;
    musicBtn.textContent = '🎵 מוזיקה 🎵';
    musicBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
  }
}

// אנימציית מוזיקה
function playBirthdayAnimation() {
  const card = document.querySelector('.birthday-card');
  card.style.animation = 'musicBounce 0.5s ease-in-out 3';
  
  setTimeout(() => {
    card.style.animation = '';
  }, 1500);
}

// הפתעה!
function triggerSurprise() {
  const surprises = [
    () => createFireworks(),
    () => createHeartRain(),
    () => createSparkleEffect(),
    () => showSurpriseMessage()
  ];
  
  const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
  randomSurprise();
}

// יצירת זיקוקים
function createFireworks() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.innerHTML = ['🎆', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
      firework.style.position = 'fixed';
      firework.style.left = Math.random() * window.innerWidth + 'px';
      firework.style.top = Math.random() * window.innerHeight + 'px';
      firework.style.fontSize = '2rem';
      firework.style.zIndex = '9999';
      firework.style.pointerEvents = 'none';
      firework.style.animation = 'fireworkExplode 2s ease-out forwards';
      
      document.body.appendChild(firework);
      
      setTimeout(() => {
        if (document.body.contains(firework)) {
          document.body.removeChild(firework);
        }
      }, 2000);
    }, i * 100);
  }
}

// גשם לבבות
function createHeartRain() {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = '-50px';
      heart.style.fontSize = '1.5rem';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      heart.style.animation = 'heartFall 3s linear forwards';
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        if (document.body.contains(heart)) {
          document.body.removeChild(heart);
        }
      }, 3000);
    }, i * 200);
  }
}

// אפקט נצנוצים
function createSparkleEffect() {
  const card = document.querySelector('.birthday-card');
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = '✨';
      sparkle.style.position = 'absolute';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.fontSize = '1rem';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
      
      card.appendChild(sparkle);
      
      setTimeout(() => {
        if (card.contains(sparkle)) {
          card.removeChild(sparkle);
        }
      }, 2000);
    }, i * 50);
  }
}

// חלקיקי חגיגה
function createCelebrationParticles() {
  const particles = ['🎊', '🎉', '🎈', '🎁', '🌟', '✨', '💫', '🎭'];
  
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'fixed';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.fontSize = '2rem';
      particle.style.zIndex = '9999';
      particle.style.pointerEvents = 'none';
      particle.style.transform = 'translate(-50%, -50%)';
      
      // כיוון רנדומלי
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 100 + Math.random() * 200;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      particle.style.animation = `particleExplosion 2s ease-out forwards`;
      particle.style.setProperty('--end-x', endX + 'px');
      particle.style.setProperty('--end-y', endY + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 2000);
    }, i * 30);
  }
}

// הודעת חגיגה
function showCelebrationMessage() {
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
    <div style="font-size: 1.5rem; font-weight: bold;">מזל טוב יהב!</div>
    <div style="font-size: 1rem; margin-top: 0.5rem;">שתהיה שנה מדהימה!</div>
  `;
  
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    padding: 2rem 3rem;
    border-radius: 20px;
    text-align: center;
    z-index: 10000;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    animation: celebrationPulse 3s ease-in-out forwards;
    font-family: 'Rubik', sans-serif;
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    if (document.body.contains(message)) {
      document.body.removeChild(message);
    }
  }, 3000);
}

// הודעת הפתעה
function showSurpriseMessage() {
  const surpriseMessages = [
    "🎁 הפתעה! יהב הכי מדהים! 🎁",
    "🌟 אתה כוכב בשמיים! 🌟",
    "🎈 השמחה שלך מדבקת! 🎈",
    "✨ מאיר את החיים שלנו! ✨"
  ];
  
  const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
  
  const message = document.createElement('div');
  message.textContent = randomMessage;
  message.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ffd93d, #ff6b6b);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    animation: surpriseBounce 2s ease-in-out forwards;
    font-family: 'Rubik', sans-serif;
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    if (document.body.contains(message)) {
      document.body.removeChild(message);
    }
  }, 2000);
}
