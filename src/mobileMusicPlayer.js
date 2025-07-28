class MobileMusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.currentAudio = null;
    this.musicFiles = [
      './music/happy-birthday-220024.mp3',
      './music/happy-birthday-to-you-127585.mp3',
      './music/happy-birthday-traditional-81.mp3',
      './music/uplifting-upbeat-happy-127627.mp3'
    ];
    this.currentIndex = 0;
    this.isMobile = this.detectMobile();
    
    console.log('🎵 נגן מוזיקה חדש נוצר - Mobile:', this.isMobile);
    console.log('🎵 קבצי מוזיקה:', this.musicFiles);
  }

  detectMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile', 'phone'];
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    
    const result = isMobileUA || isTouchDevice || isSmallScreen;
    console.log('📱 זיהוי מובייל:', {
      userAgent: isMobileUA,
      touch: isTouchDevice,
      smallScreen: isSmallScreen,
      result
    });
    
    return result;
  }

  async startPlaying() {
    console.log('🎵 מתחיל ניגון...');
    
    try {
      // עצירת מוזיקה קיימת
      this.stop();
      
      // קובץ ראשון
      const musicFile = this.musicFiles[this.currentIndex];
      console.log('🎵 מנגן:', musicFile);
      
      this.currentAudio = new Audio(musicFile);
      
      // הגדרות למובייל
      if (this.isMobile) {
        this.currentAudio.volume = 0.1; // נפח מאוד נמוך
        this.currentAudio.preload = 'none';
        this.currentAudio.setAttribute('playsinline', 'true');
        this.currentAudio.setAttribute('webkit-playsinline', 'true');
        console.log('📱 הגדרות מובייל הוחלו');
      } else {
        this.currentAudio.volume = 0.5;
        this.currentAudio.preload = 'auto';
      }
      
      // כשהשיר נגמר
      this.currentAudio.addEventListener('ended', () => {
        console.log('🎵 שיר נגמר, עובר לשיר הבא...');
        setTimeout(() => {
          if (this.isPlaying) {
            this.nextSong();
          }
        }, 1000);
      });
      
      // ניסיון ניגון
      console.log('🎵 מנסה לנגן...');
      await this.currentAudio.play();
      
      this.isPlaying = true;
      console.log('✅ ניגון התחיל בהצלחה');
      
      return true;
      
    } catch (error) {
      console.error('❌ שגיאה בניגון:', error);
      this.isPlaying = false;
      return false;
    }
  }

  stop() {
    console.log('🔇 עוצר מוזיקה...');
    
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = '';
        this.currentAudio.load();
        this.currentAudio = null;
        console.log('✅ אודיו נוקה');
      } catch (error) {
        console.error('❌ שגיאה בעצירה:', error);
      }
    }
    
    this.isPlaying = false;
    console.log('✅ מוזיקה נעצרה');
  }

  async nextSong() {
    if (!this.isPlaying) return;
    
    console.log('🔄 עובר לשיר הבא...');
    
    // מעבר לשיר הבא
    this.currentIndex = (this.currentIndex + 1) % this.musicFiles.length;
    
    // המתנה קצרה
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // התחלת השיר הבא
    this.startPlaying();
  }
}

export default MobileMusicPlayer;
