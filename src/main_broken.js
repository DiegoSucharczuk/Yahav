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
}

// סיבוב ברכות
function setupWishRotation() {
  const wishElement = document.getElementById('rotatingWish');
  
  function updateWish() {
    wishElement.style.opacity = '0';
    
    setTimeout(() => {
      wishElement.textContent = birthdayWishes[currentWishIndex];
      wishElement.style.opacity = '1';
      currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;
    }, 500);
  }
  
  // הצגת הברכה הראשונה
  updateWish();
  
  // החלפת ברכות כל 4 שניות
  setInterval(updateWish, 4000);
}

// ניהול תמונות אוטומטי
async function setupPhotoManager() {
  const photoContainer = document.getElementById('photoContainer');
  
  // טעינת תמונה רנדומלית ראשונה
  const hasImages = await photoManager.loadRandomImage(photoContainer);
  
  if (hasImages) {
    // התחלת סיבוב תמונות
    photoManager.startRotation(photoContainer, 8000);
    
    // עדכון כפתור הסיבוב
    const toggleBtn = document.getElementById('toggleRotationBtn');
    toggleBtn.textContent = '⏸️ עצור סיבוב';
  } else {
    // אם אין תמונות, הצגת הוראות
    const toggleBtn = document.getElementById('toggleRotationBtn');
    toggleBtn.style.display = 'none';
    
    const changeBtn = document.getElementById('changePhotoBtn');
    changeBtn.textContent = '📁 הוסף תמונות';
    changeBtn.onclick = () => {
      showImageInstructions();
    };
  }
}

function showImageInstructions() {
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem;">
      📁 איך להוסיף תמונות של יהב:
    </div>
    <div style="text-align: right; line-height: 1.6;">
      1. פתח את תיקיית הפרויקט<br>
      2. לך לתיקיה: <code>public/images/</code><br>
      3. העתק תמונות של יהב עם השמות:<br>
      &nbsp;&nbsp;&nbsp;• yahav1.jpg<br>
      &nbsp;&nbsp;&nbsp;• yahav2.jpg<br>
      &nbsp;&nbsp;&nbsp;• yahav3.png וכו'<br>
      4. רענן את הדף
    </div>
  `;
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.95);
    color: #2c3e50;
    padding: 2rem;
    border-radius: 20px;
    max-width: 500px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 1000;
    animation: messagePopIn 0.5s ease-out;
    text-align: center;
  `;
  
  // סגנון לקוד
  message.querySelectorAll('code').forEach(code => {
    code.style.cssText = `
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      color: #e83e8c;
    `;
  });
  
  // אנימציה
  if (!document.getElementById('messagePopStyle')) {
    const style = document.createElement('style');
    style.id = 'messagePopStyle';
    style.textContent = `
      @keyframes messagePopIn {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(message);
  
  // הסרה אחרי 8 שניות
  setTimeout(() => {
    if (document.body.contains(message)) {
      document.body.removeChild(message);
    }
  }, 8000);
  
  // סגירה בלחיצה
  message.addEventListener('click', () => {
    if (document.body.contains(message)) {
      document.body.removeChild(message);
    }
  });
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
      const photoContainer = document.getElementById('photoContainer');
      photoManager.startRotation(photoContainer, 8000);
      photoRotationActive = true;
      toggleBtn.textContent = '⏸️ עצור סיבוב';
    }
  });
}

// הפעלת מצב חגיגה
function triggerCelebration() {
  celebrationMode = !celebrationMode;
  const body = document.body;
  
  if (celebrationMode) {
    body.classList.add('celebration-mode');
    createConfetti();
    showCelebrationMessage();
  } else {
    body.classList.remove('celebration-mode');
    clearConfetti();
  }
}

// יצירת קונפטי
function createConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#ff8a80', '#81c784'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confettiContainer.appendChild(confetti);
      
      // הסרת הקונפטי לאחר האנימציה
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 3000);
    }, i * 100);
  }
}

// ניקוי קונפטי
function clearConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  confettiContainer.innerHTML = '';
}

// הודעת חגיגה
function showCelebrationMessage() {
  const messages = [
    "🎉 בואו נחגוג! 🎉",
    "🎊 יום הולדת שמח יהב! 🎊",
    "🎈 22 שנים של אושר! 🎈",
    "✨ מזל טוב! ✨"
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  // יצירת הודעה מאותחלת
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: 800;
    color: #ffd93d;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
    z-index: 1000;
    animation: celebrationPop 2s ease-out forwards;
    pointer-events: none;
  `;
  
  // הוספת אנימציה
  const style = document.createElement('style');
  style.textContent = `
    @keyframes celebrationPop {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    document.body.removeChild(messageElement);
    document.head.removeChild(style);
  }, 2000);
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
    musicPlayer.stop();
    musicPlaying = false;
    musicBtn.textContent = '🎵 מוזיקה 🎵';
    musicBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
    stopBirthdayAnimation();
    showMusicMessage('🔇 המוזיקה נעצרה');
    console.log('המוזיקה נעצרה');
  }
}

// הודעת מוזיקה
function showMusicMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.cssText = `
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    color: #2c3e50;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: musicMessageSlide 3s ease-out forwards;
    pointer-events: none;
  `;
  
  // אנימציית הודעת מוזיקה
  if (!document.getElementById('musicMessageStyle')) {
    const style = document.createElement('style');
    style.id = 'musicMessageStyle';
    style.textContent = `
      @keyframes musicMessageSlide {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        20%, 80% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    if (document.body.contains(messageElement)) {
      document.body.removeChild(messageElement);
    }
  }, 3000);
}

// אנימציית מוזיקה
function playBirthdayAnimation() {
  const balloons = document.querySelectorAll('.balloon');
  balloons.forEach(balloon => {
    balloon.style.animationDuration = '2s';
  });
}

function stopBirthdayAnimation() {
  const balloons = document.querySelectorAll('.balloon');
  balloons.forEach(balloon => {
    balloon.style.animationDuration = '6s';
  });
}

// הפתעה מיוחדת
function triggerSurprise() {
  const surprises = [
    createFireworks,
    createHearts,
    createRainbow,
    createSparkles
  ];
  
  const surprise = surprises[Math.floor(Math.random() * surprises.length)];
  surprise();
}

// זיקוקים
function createFireworks() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d'];
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%);
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 80 + 10}%;
        animation: fireworkExplosion 1s ease-out forwards;
        pointer-events: none;
        z-index: 100;
      `;
      
      document.body.appendChild(firework);
      
      setTimeout(() => {
        document.body.removeChild(firework);
      }, 1000);
    }, i * 200);
  }
  
  // הוספת אנימציית זיקוקים
  if (!document.getElementById('fireworkStyle')) {
    const style = document.createElement('style');
    style.id = 'fireworkStyle';
    style.textContent = `
      @keyframes fireworkExplosion {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// לבבות
function createHearts() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = '❤️';
      heart.style.cssText = `
        position: fixed;
        font-size: 2rem;
        left: ${Math.random() * 90}%;
        top: 100%;
        animation: heartFloat 3s ease-out forwards;
        pointer-events: none;
        z-index: 100;
      `;
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        document.body.removeChild(heart);
      }, 3000);
    }, i * 150);
  }
  
  // אנימציית לבבות
  if (!document.getElementById('heartStyle')) {
    const style = document.createElement('style');
    style.id = 'heartStyle';
    style.textContent = `
      @keyframes heartFloat {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// קשת בענן
function createRainbow() {
  const rainbow = document.createElement('div');
  rainbow.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 150px;
    background: linear-gradient(to right, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff);
    border-radius: 150px 150px 0 0;
    animation: rainbowAppear 3s ease-out forwards;
    pointer-events: none;
    z-index: 100;
  `;
  
  document.body.appendChild(rainbow);
  
  // אנימציית קשת
  if (!document.getElementById('rainbowStyle')) {
    const style = document.createElement('style');
    style.id = 'rainbowStyle';
    style.textContent = `
      @keyframes rainbowAppear {
        0% {
          opacity: 0;
          transform: translateX(-50%) scale(0);
        }
        50% {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) scale(1.2);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    document.body.removeChild(rainbow);
  }, 3000);
}

// ניצוצות
function createSparkles() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleShine 2s ease-out forwards;
        pointer-events: none;
        z-index: 100;
      `;
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        document.body.removeChild(sparkle);
      }, 2000);
    }, i * 100);
  }
  
  // אנימציית ניצוצות
  if (!document.getElementById('sparkleStyle')) {
    const style = document.createElement('style');
    style.id = 'sparkleStyle';
    style.textContent = `
      @keyframes sparkleShine {
        0%, 100% {
          opacity: 0;
          transform: scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) rotate(180deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// אנימציית בלונים מעופפים
function startFloatingAnimation() {
  const balloons = document.querySelectorAll('.balloon');
  
  balloons.forEach((balloon, index) => {
    balloon.addEventListener('mouseenter', () => {
      balloon.style.transform = 'scale(1.5) rotate(10deg)';
    });
    
    balloon.addEventListener('mouseleave', () => {
      balloon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// אפקטים נוספים בעת גלילה
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const balloons = document.querySelectorAll('.balloon');
  
  balloons.forEach((balloon, index) => {
    const speed = (index + 1) * 0.5;
    balloon.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// הודעת ברכה בטעינת הדף
window.addEventListener('load', () => {
  setTimeout(() => {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.innerHTML = `
      <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">
        🎉 ברוכים הבאים לחגיגת יום ההולדת של יהב! 🎉
      </div>
      <div style="font-size: 0.9rem; opacity: 0.8;">
        💡 לחץ על כפתור המוזיקה לשמיעת שירי יום הולדת!
      </div>
      <div style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.5rem;">
        🔧 אם המוזיקה לא עובדת, פתח את הקונסול (F12) לבדיקת שגיאות
      </div>
    `;
    welcomeMessage.style.cssText = `
      position: fixed;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem 2rem;
      border-radius: 25px;
      font-weight: 600;
      color: #2c3e50;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: welcomeSlide 8s ease-out forwards;
      pointer-events: none;
      text-align: center;
      max-width: 90%;
    `;
    
    // אנימציית ברכה
    if (!document.getElementById('welcomeStyle')) {
      const style = document.createElement('style');
      style.id = 'welcomeStyle';
      style.textContent = `
        @keyframes welcomeSlide {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          15%, 85% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      if (document.body.contains(welcomeMessage)) {
        document.body.removeChild(welcomeMessage);
      }
    }, 8000);
  }, 1000);
  
  console.log('🎉 אתר ברכת יום הולדת ליהב נטען!');
}
