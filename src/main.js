import './style.css'
import BirthdayMusicPlayer from './simpleMusicPlayer.js'
import PhotoManager from './photoManager.js'

console.log('📝 הקוד נטען בהצלחה, מחכה ל-DOM...');

// יצירת נגן מוזיקה ומנהל תמונות
console.log('🎵 יוצר נגן מוזיקה...');
let musicPlayer, photoManager;

try {
  musicPlayer = new BirthdayMusicPlayer();
  console.log('🎵 נגן מוזיקה נוצר:', musicPlayer);
} catch (error) {
  console.error('❌ שגיאה ביצירת נגן מוזיקה:', error);
}

try {
  console.log('📸 יוצר מנהל תמונות...');
  photoManager = new PhotoManager();
  console.log('📸 מנהל תמונות נוצר:', photoManager);
} catch (error) {
  console.error('❌ שגיאה ביצירת מנהל תמונות:', error);
}

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
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM נטען, מתחיל אתחול האפליקציה...');
  console.log('🎯 document.body:', document.body);
  console.log('📱 app element:', document.getElementById('app'));
  
  try {
    initializeApp();
  } catch (error) {
    console.error('❌ שגיאה באתחול האפליקציה:', error);
    document.body.innerHTML = '<div style="color: red; font-size: 24px; padding: 20px;">שגיאה באתחול: ' + error.message + '</div>';
  }
});

function initializeApp() {
  console.log('מתחיל אתחול האפליקציה...');
  
  try {
    createBirthdayCard();
    console.log('✅ כרטיס יום הולדת נוצר בהצלחה');
  } catch (error) {
    console.error('❌ שגיאה ביצירת כרטיס יום הולדת:', error);
    return;
  }
  
  // נעצור רגע יותר ארוך כדי לוודא שהאלמנטים נוצרו בבטחה
  setTimeout(() => {
    console.log('מתחיל הגדרת מרכיבי האפליקציה...');
    
    try {
      setupWishRotation();
      console.log('✅ סיבוב ברכות הוגדר');
    } catch (error) {
      console.error('❌ שגיאה בהגדרת סיבוב ברכות:', error);
    }
    
    try {
      setupPhotoManager();
      console.log('✅ מנהל תמונות הוגדר');
    } catch (error) {
      console.error('❌ שגיאה בהגדרת מנהל תמונות:', error);
    }
    
    try {
      setupEventListeners();
      console.log('✅ מאזיני אירועים הוגדרו');
    } catch (error) {
      console.error('❌ שגיאה בהגדרת מאזיני אירועים:', error);
    }
    
    try {
      startFloatingAnimation();
      console.log('✅ אנימציות הופעלו');
    } catch (error) {
      console.error('❌ שגיאה בהפעלת אנימציות:', error);
    }
    
    console.log('אתחול הושלם בהצלחה!');
  }, 200);
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
    console.log('📸 מגדיר מנהל תמונות...');
    // התחלת סיבוב אוטומטי של תמונות כל 4 שניות
    photoManager.startRotation(photoContainer, 4000);
  } else {
    console.error('❌ קונטיינר תמונות לא נמצא!');
  }
}

// מאזיני אירועים
function setupEventListeners() {
  console.log('🎯 מתחיל הגדרת אירועים...');
  console.log('🔍 בודק DOM:', document.body);
  console.log('📱 בודק app element:', document.getElementById('app'));
  
  // כפתור מוזיקה
  const musicBtn = document.getElementById('musicBtn');
  if (musicBtn) {
    musicBtn.addEventListener('click', function(e) {
      console.log('כפתור מוזיקה נלחץ!', e);
      toggleMusic();
    });
    console.log('כפתור מוזיקה הוגדר');
  } else {
    console.error('כפתור מוזיקה לא נמצא!');
  }
  
  console.log('הגדרת אירועים הושלמה');
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
  console.log('מתחיל יצירת כרטיס יום הולדת...');
  
  const app = document.getElementById('app');
  if (!app) {
    console.error('אלמנט app לא נמצא!');
    document.body.innerHTML = '<div style="color: red; font-size: 24px; padding: 20px;">שגיאה: אלמנט app לא נמצא!</div>';
    return;
  }
  console.log('אלמנט app נמצא:', app);
  
  const cardHTML = `
    <div class="birthday-card">
      <header class="card-header">
        <h1 class="main-title">${birthdayWishes[0]}</h1>
      </header>

      <section class="photo-section">
        <div class="photo-frame">
          <div class="photo-placeholder-content" id="photoContainer">
            <img src="./images/Yahav.jpeg" alt="יהב" class="birthday-photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;" />
          </div>
        </div>
      </section>

      <section class="age-celebration">
        <div class="age-number">22</div>
        <div class="age-text">שנים של אושר!</div>
      </section>

      <!-- כפתורי אינטראקציה -->
      <section class="interaction-section">
        <button class="music-btn" id="musicBtn">🎵 מוזיקה 🎵</button>
        <button class="personal-greeting-btn" id="personalGreetingBtn">💌 ברכה אישית</button>
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
  
  console.log('תוכן HTML נוצר. מוסיף event listeners ישירות...');
  
  // הוספת event listeners ישירות אחרי יצירת ה-HTML
  const musicBtn = document.getElementById('musicBtn');
  const personalGreetingBtn = document.getElementById('personalGreetingBtn');
  
  if (musicBtn) {
    musicBtn.onclick = async function() {
      console.log('🎵 כפתור מוזיקה נלחץ!');
      await toggleMusic();
    };
    console.log('✅ כפתור מוזיקה קושר ל-onclick');
  }
  
  if (personalGreetingBtn) {
    personalGreetingBtn.onclick = function() {
      console.log('💌 כפתור ברכה אישית נלחץ!');
      showPersonalGreeting();
    };
    console.log('✅ כפתור ברכה אישית קושר ל-onclick');
  }
  
  console.log('תוכן HTML נוצר. בודק אלמנטים...');
  
  // בדיקה שהאלמנטים נוצרו
  setTimeout(() => {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const musicBtn = document.getElementById('musicBtn');
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    console.log('כפתור חגיגה:', celebrateBtn);
    console.log('כפתור מוזיקה:', musicBtn);
    console.log('כפתור הפתעה:', surpriseBtn);
  }, 50);
  
  console.log('יצירת כרטיס יום הולדת הושלמה');
}

// חגיגה!
function triggerCelebration() {
  console.log('🎊 נקראה פונקציית triggerCelebration!');
  celebrationMode = true;
  const celebrateBtn = document.getElementById('celebrateBtn');
  
  if (!celebrateBtn) {
    console.error('כפתור חגיגה לא נמצא!');
    return;
  }
  
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
  console.log('🎵 נקראה פונקציית toggleMusic!');
  
  const musicBtn = document.getElementById('musicBtn');
  
  if (!musicBtn) {
    console.error('כפתור מוזיקה לא נמצא!');
    return;
  }
  
  console.log('🎵 סטטוס מוזיקה נוכחי (main.js):', musicPlaying);
  console.log('🎵 סטטוס מוזיקה נוכחי (musicPlayer):', musicPlayer.isPlaying);
  console.log('🎵 musicPlayer:', musicPlayer);
  
  // השתמש בסטטוס של המחלקה כמקור האמת
  const isCurrentlyPlaying = musicPlayer.isPlaying;
  
  if (!isCurrentlyPlaying) {
    // הפעלת מוזיקה
    musicBtn.textContent = '🎵 טוען... 🎵';
    musicBtn.disabled = true;
    
    console.log('🎵 מנסה להפעיל מוזיקה...');
    try {
      const result = await musicPlayer.play();
      console.log('🎵 תוצאת הפעלת מוזיקה:', result);
      
      if (result && musicPlayer.isPlaying) {
        musicPlaying = true;
        musicBtn.textContent = '🔇 עצור מוזיקה 🔇';
        musicBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
        playBirthdayAnimation();
        console.log('✅ מוזיקה הופעלה בהצלחה');
      } else {
        musicBtn.textContent = '❌ שגיאה במוזיקה';
        console.error('❌ הפעלת מוזיקה נכשלה');
        musicPlaying = false;
      }
    } catch (error) {
      console.error('❌ שגיאה בהפעלת מוזיקה:', error);
      musicBtn.textContent = '❌ שגיאה במוזיקה';
      musicPlaying = false;
    }
    
    musicBtn.disabled = false;
  } else {
    // עצירת מוזיקה
    console.log('🔇 עוצר מוזיקה...');
    try {
      musicPlayer.stop();
      musicPlaying = false;
      musicBtn.textContent = '🎵 מוזיקה 🎵';
      musicBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
      console.log('✅ מוזיקה נעצרה');
    } catch (error) {
      console.error('❌ שגיאה בעצירת מוזיקה:', error);
    }
  }
}

// ברכה אישית מיוחדת
function showPersonalGreeting() {
  console.log('💌 מציג ברכה אישית מיוחדת');
  
  const personalMessage = `
    <div style="text-align: center; line-height: 1.6; font-size: 1.1rem;">
      <h2 style="color: #ffd93d; margin-bottom: 1rem; font-size: 1.8rem;">יהב שלנו בן 22! 🥳</h2>
      
      <p style="margin-bottom: 1rem;">זה הגיל שבו אתה כבר לא שואל אם מותר – פשוט עושה את זה בסטייל 😎</p>
      
      <p style="margin-bottom: 1rem;">שתמשיך לעוף גבוה, לאכול טוב, לאהוב חזק, ולחייך אפילו כשאין סיבה.</p>
      
      <p style="margin-bottom: 1rem; font-style: italic;">כי עם חיוך כמו שלך – העולם פשוט נראה טוב יותר.</p>
      
      <p style="margin-bottom: 1.5rem; font-weight: bold;">יאללה, לך תכבוש את העולם (אבל תזכור איפה התחלת 😉)</p>
      
      <div style="border-top: 2px solid #ffd93d; padding-top: 1rem; margin-top: 1.5rem;">
        <p style="color: #ff6b6b; font-size: 1.3rem; font-weight: bold;">אוהבים בלי סוף ❤️</p>
        <p style="color: #4ecdc4; font-weight: 600;">המשפחה שלך</p>
      </div>
    </div>
  `;
  
  showModal('💌 ברכה מיוחדת למלך שלנו', personalMessage);
}

// פונקציה כללית להצגת מודל
function showModal(title, content) {
  // יצירת הרקע המטושטש
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;
  `;
  
  // יצירת המודל
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
    border-radius: 20px;
    padding: 2rem;
    max-width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 217, 61, 0.5);
    animation: slideInUp 0.4s ease;
    color: #2c3e50;
    text-align: center;
  `;
  
  modal.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <h1 style="color: #ff6b6b; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h1>
      ${content}
    </div>
    <button id="closeModal" style="
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    ">
      ❤️ סגור
    </button>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // סגירת המודל
  const closeBtn = modal.querySelector('#closeModal');
  const closeModal = () => {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  };
  
  closeBtn.onclick = closeModal;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };
  
  // אפקט hover לכפתור
  closeBtn.onmouseenter = () => {
    closeBtn.style.transform = 'scale(1.05)';
    closeBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
  };
  closeBtn.onmouseleave = () => {
    closeBtn.style.transform = 'scale(1)';
    closeBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  };
}
function playBirthdayAnimation() {
  const card = document.querySelector('.birthday-card');
  card.style.animation = 'musicBounce 0.5s ease-in-out 3';
  
  setTimeout(() => {
    card.style.animation = '';
  }, 1500);
}

// הפתעה!
function triggerSurprise() {
  console.log('🎁 נקראה פונקציית triggerSurprise!');
  
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
