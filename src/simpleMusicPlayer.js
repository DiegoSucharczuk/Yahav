// Simple Music Player - נגן מוזיקה פשוט
class BirthdayMusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.currentAudio = null;
    this.musicFiles = [];
    this.volume = 0.7;
    this.onSongEnded = null; // מטפל לסיום שיר
    this.retryCount = 0; // מונה ניסיונות חוזרים
    this.maxRetries = 3; // מקסימום ניסיונות
  }

  // גילוי קבצי מוזיקה בתיקיה
  async discoverMusic() {
    console.log('🔍 מגלה קבצי מוזיקה...');
    
    // קבצים שידועים שקיימים בתיקיה
    const knownFiles = [
      'happy-birthday-220024.mp3',
      'happy-birthday-368842.mp3', 
      'happy-birthday-my-kitty-120918.mp3',
      'happy-birthday-party-remix-262038.mp3'
    ];

    // קבצים נוספים שאולי קיימים
    const possibleFiles = [
      'birthday1.mp3',
      'birthday2.mp3', 
      'birthday3.mp3',
      'happy-birthday.mp3',
      'celebration.mp3',
      'birthday-song.mp3',
      'party.mp3'
    ];

    this.musicFiles = [];
    
    // בדיקת הקבצים הידועים קודם
    for (const fileName of knownFiles) {
      try {
        console.log('🔍 בודק קובץ ידוע:', fileName);
        const response = await fetch(`/music/${fileName}`, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ נמצא קובץ:', fileName);
          this.musicFiles.push(`/music/${fileName}`);
        } else {
          console.log('❌ לא נמצא קובץ ידוע:', fileName);
        }
      } catch (error) {
        console.log('❌ שגיאה בבדיקת קובץ ידוע:', fileName, error.message);
      }
    }
    
    // אם יש כבר קבצים, לא צריך לבדוק עוד
    if (this.musicFiles.length > 0) {
      console.log('🎵 נמצאו מספיק קבצי מוזיקה ידועים:', this.musicFiles.length);
      return true;
    }
    
    // בדיקת קבצים אפשריים נוספים
    for (const fileName of possibleFiles) {
      try {
        console.log('🔍 בודק קובץ אפשרי:', fileName);
        const response = await fetch(`/music/${fileName}`, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ נמצא קובץ אפשרי:', fileName);
          this.musicFiles.push(`/music/${fileName}`);
        }
      } catch (error) {
        console.log('❌ שגיאה בבדיקת קובץ אפשרי:', fileName, error.message);
      }
    }
    
    console.log('🎵 סה"כ קבצי מוזיקה שנמצאו:', this.musicFiles.length);
    console.log('🎵 רשימת קבצים:', this.musicFiles);
    return this.musicFiles.length > 0;
  }

  // בחירת שיר רנדומלי
  getRandomSong() {
    if (this.musicFiles.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.musicFiles.length);
    return this.musicFiles[randomIndex];
  }

  // ניגון שיר
  async playRandomSong() {
    // עצירת השיר הנוכחי אם קיים
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.removeEventListener('ended', this.onSongEnded);
      this.currentAudio = null;
    }

    const songPath = this.getRandomSong();
    if (!songPath) {
      console.log('❌ לא נמצא שיר לניגון');
      this.isPlaying = false;
      return false;
    }

    try {
      console.log('🎵 מנגן שיר:', songPath);
      this.currentAudio = new Audio(songPath);
      this.currentAudio.volume = this.volume;
      this.currentAudio.loop = false;
      
      // כשהשיר נגמר, נניגן אחר (עם הגנה מפני שגיאות)
      this.onSongEnded = async () => {
        console.log('🎵 שיר נגמר, מחליף לשיר חדש...');
        if (this.isPlaying) {
          setTimeout(() => {
            this.playRandomSong().catch(err => {
              console.error('❌ שגיאה בהחלפת שיר:', err);
              this.isPlaying = false;
            });
          }, 500); // המתנה קצרה בין שירים
        }
      };
      
      this.currentAudio.addEventListener('ended', this.onSongEnded);
      
      // הוספת מטפל שגיאות
      this.currentAudio.addEventListener('error', (e) => {
        console.error('❌ שגיאה בניגון:', e);
        this.isPlaying = false;
        // ניסיון לנגן שיר אחר
        setTimeout(() => {
          if (this.isPlaying) {
            this.playRandomSong().catch(err => console.error('❌ שגיאה בחזרה על ניגון:', err));
          }
        }, 1000);
      });

      await this.currentAudio.play();
      this.isPlaying = true;
      console.log('✅ שיר מתחיל לנגן בהצלחה');
      return true;
    } catch (error) {
      console.error('❌ שגיאה בניגון שיר:', error);
      this.isPlaying = false;
      return false;
    }
  }

  // התחלת מוזיקה
  async play() {
    console.log('🎵 BirthdayMusicPlayer.play() נקרא');
    console.log('🎵 isPlaying:', this.isPlaying);
    
    if (this.isPlaying) {
      console.log('🔇 מוזיקה כבר פועלת, עוצר...');
      this.stop();
      return true;
    }

    try {
      console.log('🎵 מנסה לגלות מוזיקה...');
      const hasMusic = await this.discoverMusic();
      console.log('🎵 האם נמצאה מוזיקה:', hasMusic);
      console.log('🎵 קבצי מוזיקה:', this.musicFiles);
      
      if (hasMusic) {
        this.retryCount = 0; // איפוס מונה ניסיונות
        const result = await this.playRandomSong();
        console.log('🎵 תוצאת ניגון:', result);
        return result;
      }
      
      console.log('❌ לא נמצאה מוזיקה');
      return false;
    } catch (error) {
      console.error('❌ שגיאה כללית בהפעלת מוזיקה:', error);
      this.isPlaying = false;
      return false;
    }
  }

  // עצירת מוזיקה
  stop() {
    console.log('🔇 עוצר מוזיקה...');
    this.isPlaying = false;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      // הסרת event listeners למניעת דליפת זיכרון
      if (this.onSongEnded) {
        this.currentAudio.removeEventListener('ended', this.onSongEnded);
      }
      this.currentAudio.removeEventListener('error', this.onSongEnded);
      this.currentAudio.currentTime = 0; // איפוס המיקום
      this.currentAudio = null;
    }
    
    console.log('✅ מוזיקה נעצרה');
  }

  // ניקוי משאבים
  destroy() {
    console.log('🗑️ מנקה משאבי נגן מוזיקה...');
    this.stop();
    this.musicFiles = [];
    this.onSongEnded = null;
  }
}

export default BirthdayMusicPlayer;
