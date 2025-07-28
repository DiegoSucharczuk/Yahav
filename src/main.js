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

// אתחול האפליקציה
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM נטען, מתחיל אתחול האפליקציה...');
  
  try {
    initializeApp();
  } catch (error) {
    console.error('❌ שגיאה באתחול האפליקציה:', error);
    document.body.innerHTML = '<div style="color: red; font-size: 24px; padding: 20px;">שגיאה באתחול: ' + error.message + '</div>';
  }
});

function initializeApp() {
  createBirthdayCard();
  setupWishRotation();
  setupPhotoManager();
  setupEventListeners();
  startFloatingAnimation();
}

// יצירת כרטיס יום הולדת
function createBirthdayCard() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('אלמנט app לא נמצא!');
    return;
  }
  
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
    photoManager.startRotation(photoContainer, 4000);
  } else {
    console.error('❌ קונטיינר תמונות לא נמצא!');
  }
}

// מאזיני אירועים
function setupEventListeners() {
  console.log('🎯 מתחיל הגדרת אירועים...');
  
  const musicBtn = document.getElementById('musicBtn');
  const personalGreetingBtn = document.getElementById('personalGreetingBtn');
  
  if (musicBtn) {
    musicBtn.onclick = async function() {
      console.log('🎵 כפתור מוזיקה נלחץ!');
      await toggleMusic();
    };
    console.log('✅ כפתור מוזיקה קושר');
  }
  
  if (personalGreetingBtn) {
    personalGreetingBtn.onclick = function() {
      console.log('💌 כפתור ברכה אישית נלחץ!');
      showPersonalGreeting();
    };
    console.log('✅ כפתור ברכה אישית קושר');
  }
}

// אנימציה מעופפת
function startFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating-elements > *');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// מוזיקה פשוטה ונקייה
async function toggleMusic() {
  console.log('🎵 ========== toggleMusic() התחיל ==========');
  
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) {
    console.error('❌ כפתור מוזיקה לא נמצא!');
    return;
  }
  
  console.log('🎵 מצב נוכחי - musicPlaying:', musicPlaying);
  
  if (!musicPlaying) {
    // מפעילים מוזיקה
    console.log('🎵 מפעיל מוזיקה...');
    
    musicBtn.textContent = '🎵 טוען... 🎵';
    musicBtn.disabled = true;
    
    try {
      const success = await musicPlayer.startPlaying();
      
      if (success) {
        musicPlaying = true;
        musicBtn.textContent = '🔇 עצור מוזיקה 🔇';
        musicBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
        playBirthdayAnimation();
        console.log('✅ מוזיקה הופעלה בהצלחה');
      } else {
        musicBtn.textContent = '❌ שגיאה במוזיקה';
        console.error('❌ הפעלת מוזיקה נכשלה');
        
        // ניסיון שני אחרי שנייה
        setTimeout(async () => {
          console.log('🔄 ניסיון שני...');
          const secondTry = await musicPlayer.startPlaying();
          if (secondTry) {
            musicPlaying = true;
            musicBtn.textContent = '🔇 עצור מוזיקה 🔇';
            musicBtn.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
            console.log('✅ ניסיון שני הצליח');
          } else {
            musicBtn.textContent = '🎵 מוזיקה 🎵';
          }
          musicBtn.disabled = false;
        }, 1000);
        return;
      }
    } catch (error) {
      console.error('❌ שגיאה:', error);
      musicBtn.textContent = '❌ שגיאה במוזיקה';
    }
    
    musicBtn.disabled = false;
  } else {
    // עוצרים מוזיקה
    console.log('🔇 עוצר מוזיקה...');
    
    try {
      musicPlayer.stop();
      musicPlaying = false;
      musicBtn.textContent = '🎵 מוזיקה 🎵';
      musicBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
      console.log('✅ מוזיקה נעצרה בהצלחה');
    } catch (error) {
      console.error('❌ שגיאה בעצירת מוזיקה:', error);
    }
  }
  
  console.log('🎵 ========== toggleMusic() הסתיים ==========');
}

// אנימציית מוזיקה
function playBirthdayAnimation() {
  const card = document.querySelector('.birthday-card');
  if (card) {
    card.style.animation = 'musicBounce 0.5s ease-in-out 3';
    
    setTimeout(() => {
      card.style.animation = '';
    }, 1500);
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
