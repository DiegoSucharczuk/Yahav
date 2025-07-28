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
    this.isMobile = this.detectMobile(); // זיהוי מובייל
    
    // הגדרות מיוחדות למובייל
    if (this.isMobile) {
      this.volume = 0.5; // עוצמה נמוכה יותר למובייל
      console.log('📱 זוהה מובייל - הגדרות מיוחדות הופעלו');
    }
  }
  
  // זיהוי אם זה מובייל - משופר
  detectMobile() {
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    
    const result = isMobileUA || (isTouchDevice && isSmallScreen);
    console.log('📱 בדיקת מובייל:', {
      userAgent: isMobileUA,
      touchDevice: isTouchDevice,
      smallScreen: isSmallScreen,
      result: result
    });
    
    return result;
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
        const response = await fetch(`./music/${fileName}`, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ נמצא קובץ:', fileName);
          this.musicFiles.push(`./music/${fileName}`);
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
        const response = await fetch(`./music/${fileName}`, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ נמצא קובץ אפשרי:', fileName);
          this.musicFiles.push(`./music/${fileName}`);
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
      
      // אסטרטגיה מיוחדת לטעינה במובייל
      if (this.isMobile) {
        console.log('📱 הכנת אודיו למובייל...');
        this.currentAudio.load(); // כפיית טעינה מחדש במובייל
        
        // המתנה לטעינה במובייל
        await new Promise((resolve) => {
          if (this.currentAudio.readyState >= 2) {
            console.log('📱 אודיו כבר טעון במובייל');
            resolve();
          } else {
            this.currentAudio.addEventListener('loadeddata', () => {
              console.log('📱 נתוני אודיו נטענו במובייל');
              resolve();
            }, { once: true });
            this.currentAudio.addEventListener('canplay', () => {
              console.log('📱 אודיו מוכן לניגון במובייל');
              resolve();
            }, { once: true });
            // timeout אם הטעינה נתקעת
            setTimeout(() => {
              console.log('📱 timeout טעינה - ממשיך בכל זאת');
              resolve();
            }, 2000);
          }
        });
      }
      
      // הגדרות מיוחדות למובייל
      if (this.isMobile) {
        console.log('📱 מגדיר אודיו למובייל - גרסה אגרסיבית...');
        this.currentAudio.volume = 0.15; // עוצמה מאוד נמוכה למובייל
        this.currentAudio.preload = 'none'; // בלי preload כלל למובייל
        this.currentAudio.crossOrigin = null; // ביטול CORS למובייל
        
        // הגדרות אגרסיביות למניעת קטיעות במובייל
        this.currentAudio.setAttribute('playsinline', 'true');
        this.currentAudio.setAttribute('webkit-playsinline', 'true');
        this.currentAudio.setAttribute('x5-playsinline', 'true'); // WeChat browser
        this.currentAudio.setAttribute('x5-video-player-type', 'h5');
        this.currentAudio.setAttribute('controls', 'false');
        this.currentAudio.autoplay = false;
        this.currentAudio.muted = false;
        
        // הגדרות נוספות למובייל
        this.currentAudio.defaultMuted = false;
        this.currentAudio.defaultPlaybackRate = 1.0;
        
        console.log('📱 הגדרות מובייל אגרסיביות הושלמו - volume:', this.currentAudio.volume);
      } else {
        this.currentAudio.volume = this.volume;
        this.currentAudio.preload = 'auto';
        this.currentAudio.crossOrigin = 'anonymous';
      }
      
      this.currentAudio.loop = false;
      
      // טיפול באירועי טעינה
      this.currentAudio.addEventListener('canplaythrough', () => {
        console.log('🎵 אודיו מוכן לניגון');
      });
      
      this.currentAudio.addEventListener('loadstart', () => {
        console.log('🎵 התחלת טעינת אודיו');
      });
      
      this.currentAudio.addEventListener('loadeddata', () => {
        console.log('🎵 נתוני אודיו נטענו');
      });
      
      // מיוחד למובייל - בדיקת חיבור ומניעת קטיעות
      if (this.isMobile) {
        this.currentAudio.addEventListener('stalled', () => {
          console.log('📱 אודיו נתקע במובייל - מנסה שוב...');
          // הורדה זמנית של עוצמת הקול
          if (this.currentAudio.volume > 0.05) {
            this.currentAudio.volume = 0.05;
          }
        });
        
        this.currentAudio.addEventListener('waiting', () => {
          console.log('📱 ממתין לנתונים במובייל...');
          // הורדה זמנית של עוצמת הקול
          if (this.currentAudio.volume > 0.05) {
            this.currentAudio.volume = 0.05;
          }
        });
        
        this.currentAudio.addEventListener('suspend', () => {
          console.log('📱 טעינת אודיו הושעתה במובייל');
        });
        
        this.currentAudio.addEventListener('playing', () => {
          console.log('📱 אודיו מתחיל לנגן במובייל');
          // החזרת עוצמת הקול לרגיל
          setTimeout(() => {
            if (this.currentAudio && !this.currentAudio.paused) {
              this.currentAudio.volume = 0.15;
            }
          }, 500);
        });
        
        this.currentAudio.addEventListener('pause', () => {
          console.log('📱 אודיו נעצר במובייל');
        });
        
        // מנגנון התאוששות מקטיעות
        this.currentAudio.addEventListener('canplay', () => {
          console.log('📱 אודיו מוכן לניגון במובייל');
          if (this.isPlaying && this.currentAudio.paused) {
            console.log('📱 ניסיון לחדש ניגון אחרי קטיעה...');
            setTimeout(() => {
              if (this.isPlaying) {
                this.currentAudio.play().catch(err => {
                  console.log('📱 לא הצליח לחדש ניגון:', err);
                });
              }
            }, 200);
          }
        });
      }
      
      // כשהשיר נגמר, נניגן אחר (רק אם המשתמש לא עצר ידנית)
      this.onSongEnded = async () => {
        console.log('🎵 שיר נגמר');
        console.log('🎵 isPlaying לפני בדיקה:', this.isPlaying);
        
        // בדיקה אם המשתמש עצר ידנית
        if (this.isPlaying && this.currentAudio) {
          console.log('🎵 מחליף לשיר חדש...');
          const waitTime = this.isMobile ? 4000 : 1000; // זמן המתנה ארוך יותר למובייל
          setTimeout(() => {
            if (this.isPlaying) { // בדיקה נוספת
              // עבור מובייל - ניקוי מקיף יותר לפני שיר חדש
              if (this.isMobile) {
                console.log('📱 ניקוי מיוחד למובייל לפני שיר חדש...');
                if (this.currentAudio) {
                  this.currentAudio.pause();
                  this.currentAudio.currentTime = 0;
                  this.currentAudio.src = '';
                  this.currentAudio.load();
                  this.currentAudio = null;
                }
                // המתנה נוספת למובייל
                setTimeout(() => {
                  if (this.isPlaying) {
                    this.playRandomSong().catch(err => {
                      console.error('❌ שגיאה בהחלפת שיר במובייל:', err);
                      this.isPlaying = false;
                    });
                  }
                }, 1000);
              } else {
                this.playRandomSong().catch(err => {
                  console.error('❌ שגיאה בהחלפת שיר:', err);
                  this.isPlaying = false;
                });
              }
            }
          }, waitTime);
        } else {
          console.log('🔇 לא מחליף שיר כי המשתמש עצר ידנית');
        }
      };
      
      this.currentAudio.addEventListener('ended', this.onSongEnded);
      
      // הוספת מטפל שגיאות מורחב
      this.currentAudio.addEventListener('error', (e) => {
        console.error('❌ שגיאה בניגון:', e);
        console.error('❌ פרטי שגיאה:', e.target.error);
        this.isPlaying = false;
        // ניסיון לנגן שיר אחר אחרי זמן ארוך יותר
        setTimeout(() => {
          if (this.isPlaying) {
            this.playRandomSong().catch(err => console.error('❌ שגיאה בחזרה על ניגון:', err));
          }
        }, 2000);
      });
      
      // מטפל להשהיות
      this.currentAudio.addEventListener('stalled', () => {
        console.log('⏸️ אודיו נתקע, מנסה להמשיך...');
      });
      
      this.currentAudio.addEventListener('waiting', () => {
        console.log('⏳ ממתין לנתונים נוספים...');
      });

      // ניסיון ניגון משופר למובייל
      if (this.isMobile) {
        console.log('📱 ניסיון ניגון במובייל עם מנגנון התאוששות...');
        
        // המתנה ארוכה יותר למובייל עם מנגנון התאוששות
        await new Promise((resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 3;
          
          const tryPlay = async () => {
            attempts++;
            console.log(`📱 ניסיון ניגון ${attempts}/${maxAttempts} במובייל`);
            
            try {
              // טעינה מחדש לפני כל ניסיון
              if (attempts > 1) {
                this.currentAudio.load();
                await new Promise(r => setTimeout(r, 500));
              }
              
              const playPromise = this.currentAudio.play();
              
              if (playPromise !== undefined) {
                await playPromise;
                console.log('✅ ניגון התחיל בהצלחה במובייל');
                this.isPlaying = true;
                resolve();
              } else {
                this.isPlaying = true;
                console.log('✅ ניגון הופעל (דפדפן ישן במובייל)');
                resolve();
              }
            } catch (error) {
              console.error(`❌ ניסיון ${attempts} נכשל:`, error);
              
              if (attempts < maxAttempts) {
                console.log('📱 מנסה שוב עם המתנה...');
                setTimeout(tryPlay, 1000);
              } else {
                console.error('❌ כל הניסיונות נכשלו במובייל');
                this.isPlaying = false;
                reject(error);
              }
            }
          };
          
          // המתנה ראשונית לטעינה
          if (this.currentAudio.readyState < 2) {
            this.currentAudio.addEventListener('canplay', () => {
              console.log('📱 אודיו מוכן לניגון במובייל');
              setTimeout(tryPlay, 200);
            }, { once: true });
            
            // timeout אם הטעינה נתקעת
            setTimeout(() => {
              console.log('📱 timeout טעינה - מנסה בכל זאת');
              tryPlay();
            }, 2000);
          } else {
            console.log('📱 אודיו כבר טעון במובייל');
            setTimeout(tryPlay, 200);
          }
        });
      } else {
        // ניגון רגיל למחשב
        await new Promise((resolve, reject) => {
          const playPromise = this.currentAudio.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('✅ ניגון התחיל בהצלחה');
                this.isPlaying = true;
                resolve();
              })
              .catch((error) => {
                console.error('❌ שגיאה בהתחלת ניגון:', error);
                this.isPlaying = false;
                reject(error);
              });
          } else {
            this.isPlaying = true;
            console.log('✅ ניגון הופעל (דפדפן ישן)');
            resolve();
          }
        });
      }
      
      console.log('✅ שיר מתחיל לנגן בהצלחה - isPlaying:', this.isPlaying);
      return true;
    } catch (error) {
      console.error('❌ שגיאה בניגון שיר:', error);
      this.isPlaying = false;
      return false;
    }
  }

  // פונקציה פשוטה להתחלת ניגון
  async startPlaying() {
    console.log('🎵 startPlaying() נקרא');
    
    // וידוא שאין מוזיקה פועלת
    if (this.isPlaying) {
      console.log('🎵 מוזיקה כבר פועלת');
      return false;
    }
    
    try {
      const hasMusic = await this.discoverMusic();
      if (hasMusic) {
        const result = await this.playRandomSong();
        return result;
      }
      return false;
    } catch (error) {
      console.error('❌ שגיאה ב-startPlaying:', error);
      return false;
    }
  }

  // התחלת מוזיקה (פונקציה ישנה - נשמרת לתאימות)
  async play() {
    console.log('🎵 BirthdayMusicPlayer.play() נקרא');
    console.log('🎵 isPlaying בתחילה:', this.isPlaying);
    
    // אם מוזיקה כבר פועלת - לא עושים כלום ומחזירים false
    if (this.isPlaying) {
      console.log('🔇 מוזיקה כבר פועלת - לא מבצע פעולה');
      return false;
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
        console.log('🎵 isPlaying אחרי ניסיון ניגון:', this.isPlaying);
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
    console.log('🔇 ========== stop() התחיל ==========');
    console.log('🔇 זמן:', new Date().toLocaleTimeString());
    console.log('🔇 isPlaying לפני עצירה:', this.isPlaying);
    console.log('🔇 currentAudio לפני עצירה:', this.currentAudio);
    
    if (this.currentAudio) {
      console.log('🔇 נמצא currentAudio, מתחיל עצירה...');
      console.log('🔇 מצב אודיו לפני עצירה:', {
        paused: this.currentAudio.paused,
        currentTime: this.currentAudio.currentTime,
        duration: this.currentAudio.duration
      });
      
      console.log('🔇 עוצר אודיו...');
      this.currentAudio.pause();
      console.log('🔇 מאפס currentTime...');
      this.currentAudio.currentTime = 0;
      
      // הסרת event listeners למניעת דליפת זיכרון
      if (this.onSongEnded) {
        console.log('🔇 מסיר event listener עבור ended...');
        this.currentAudio.removeEventListener('ended', this.onSongEnded);
      }
      console.log('🔇 מסיר event listener עבור error...');
      this.currentAudio.removeEventListener('error', this.onSongEnded);
      
      console.log('🔇 מנקה currentAudio...');
      // ניקוי מלא
      this.currentAudio = null;
      console.log('🔇 currentAudio נוקה:', this.currentAudio);
    } else {
      console.log('🔇 אין currentAudio, אין מה לעצור');
    }
    
    // חשוב! סמן שהמשתמש עצר ידנית - תמיד לפני הלוג
    console.log('🔇 מעדכן isPlaying ל-false...');
    this.isPlaying = false;
    this.onSongEnded = null;
    
    console.log('🔇 ========== stop() הסתיים ==========');
    console.log('✅ מוזיקה נעצרה - isPlaying:', this.isPlaying);
    console.log('🔇 currentAudio אחרי עצירה:', this.currentAudio);
    console.log('🔇 onSongEnded אחרי עצירה:', this.onSongEnded);
    return true; // מחזיר הצלחה
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
