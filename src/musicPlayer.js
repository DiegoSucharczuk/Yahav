// Advanced Music Player - נגן מוזיקה מתקדם
class BirthdayMusicPlayer {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.currentAudio = null;
    this.musicFiles = [
      // שמות הקבצים הקיימים
      '/music/happy-birthday-220024.mp3',
      '/music/happy-birthday-368842.mp3',
      '/music/happy-birthday-my-kitty-120918.mp3',
      '/music/happy-birthday-party-remix-262038.mp3',
      // שמות נוספים אפשריים
      '/music/birthday1.mp3',
      '/music/birthday2.mp3',
      '/music/birthday3.mp3',
      '/music/happy-birthday.mp3',
      '/music/celebration.mp3'
    ];
    this.currentSongIndex = 0;
    this.volume = 0.7;
  }

  async checkMusicFiles() {
    // בדיקה איזה קבצי מוזיקה קיימים
    const availableFiles = [];
    
    console.log('בודק קבצי מוזיקה...');
    
    for (const file of this.musicFiles) {
      try {
        const response = await fetch(file, { method: 'HEAD' });
        if (response.ok) {
          availableFiles.push(file);
          console.log(`נמצא קובץ מוזיקה: ${file}`);
        }
      } catch (error) {
        console.log(`Music file not found: ${file}`);
      }
    }
    
    console.log(`סה"כ נמצאו ${availableFiles.length} קבצי מוזיקה`);
    
    if (availableFiles.length > 0) {
      this.musicFiles = availableFiles;
      return true;
    }
    
    // אם אין קבצי MP3, נשתמש ב-Web Audio API
    console.log('לא נמצאו קבצי MP3, עובר למנגינות מובנות');
    return false;
  }

  getRandomSong() {
    const randomIndex = Math.floor(Math.random() * this.musicFiles.length);
    return this.musicFiles[randomIndex];
  }

  async playMP3(songPath) {
    try {
      console.log(`מנסה לנגן: ${songPath}`);
      
      // עצירת השיר הנוכחי אם קיים
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      this.currentAudio = new Audio(songPath);
      this.currentAudio.volume = this.volume;
      this.currentAudio.loop = true;
      
      // אירועים
      this.currentAudio.addEventListener('loadstart', () => {
        console.log('טוען מוזיקה...');
      });
      
      this.currentAudio.addEventListener('canplaythrough', () => {
        console.log('המוזיקה מוכנה לניגון!');
      });
      
      this.currentAudio.addEventListener('playing', () => {
        console.log('המוזיקה מתחילה לנגן!');
      });
      
      this.currentAudio.addEventListener('error', (e) => {
        console.error('שגיאה בטעינת המוזיקה:', e);
        console.error('פרטי השגיאה:', this.currentAudio.error);
        this.fallbackToWebAudio();
      });

      // ניסיון לנגן
      await this.currentAudio.play();
      this.isPlaying = true;
      console.log('המוזיקה מנגנת בהצלחה!');
      return true;
      
    } catch (error) {
      console.error('שגיאה בניגון MP3:', error);
      
      // אם זה שגיאת הרשאה, ננסה שוב
      if (error.name === 'NotAllowedError') {
        console.log('הדפדפן חסם ניגון אוטומטי - נדרש אינטראקציה של המשתמש');
        throw new Error('user_interaction_required');
      }
      
      return false;
    }
  }

  async fallbackToWebAudio() {
    // חזרה למוזיקה מובנית אם MP3 לא עובד
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.playWebAudioSongs();
      return true;
    } catch (error) {
      console.log('Web Audio API not supported');
      return false;
    }
  }

  playWebAudioSongs() {
    // מנגינות מתקדמות יותר
    const songs = [
      this.playHappyBirthday,
      this.playJoyfulMelody,
      this.playCelebrationTheme,
      this.playFestivalTune
    ];
    
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    randomSong.call(this);
    
    // החלפת שירים כל 15 שניות
    if (this.isPlaying) {
      setTimeout(() => {
        if (this.isPlaying) {
          this.playWebAudioSongs();
        }
      }, 15000);
    }
  }

  playNote(frequency, duration, startTime = 0, type = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();
    
    oscillator.connect(noteGain);
    noteGain.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime + startTime);
    oscillator.type = type;
    
    noteGain.gain.setValueAtTime(0, this.audioContext.currentTime + startTime);
    noteGain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + startTime + 0.01);
    noteGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + startTime + duration);
    
    oscillator.start(this.audioContext.currentTime + startTime);
    oscillator.stop(this.audioContext.currentTime + startTime + duration);
  }

  playHappyBirthday() {
    const notes = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
      G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
    };

    const melody = [
      { note: notes.C4, duration: 0.5 }, { note: notes.C4, duration: 0.25 },
      { note: notes.D4, duration: 0.5 }, { note: notes.C4, duration: 0.5 },
      { note: notes.F4, duration: 0.5 }, { note: notes.E4, duration: 1 },
      { note: notes.C4, duration: 0.5 }, { note: notes.C4, duration: 0.25 },
      { note: notes.D4, duration: 0.5 }, { note: notes.C4, duration: 0.5 },
      { note: notes.G4, duration: 0.5 }, { note: notes.F4, duration: 1 }
    ];

    let currentTime = 0;
    melody.forEach(({ note, duration }) => {
      this.playNote(note, duration, currentTime, 'triangle');
      currentTime += duration;
    });
  }

  playJoyfulMelody() {
    const notes = { C4: 261.63, E4: 329.63, G4: 392.00, C5: 523.25, E5: 659.25 };
    const melody = [
      { note: notes.C4, duration: 0.3 }, { note: notes.E4, duration: 0.3 },
      { note: notes.G4, duration: 0.3 }, { note: notes.C5, duration: 0.3 },
      { note: notes.E5, duration: 0.6 }, { note: notes.C5, duration: 0.3 },
      { note: notes.G4, duration: 0.3 }, { note: notes.E4, duration: 0.6 }
    ];

    let currentTime = 0;
    melody.forEach(({ note, duration }) => {
      this.playNote(note, duration, currentTime, 'square');
      currentTime += duration;
    });
  }

  playCelebrationTheme() {
    const notes = { D4: 293.66, F4: 349.23, A4: 440.00, D5: 587.33 };
    const melody = [
      { note: notes.D4, duration: 0.4 }, { note: notes.F4, duration: 0.4 },
      { note: notes.A4, duration: 0.4 }, { note: notes.D5, duration: 0.8 },
      { note: notes.A4, duration: 0.4 }, { note: notes.F4, duration: 0.4 },
      { note: notes.D4, duration: 0.8 }
    ];

    let currentTime = 0;
    melody.forEach(({ note, duration }) => {
      this.playNote(note, duration, currentTime, 'sawtooth');
      currentTime += duration;
    });
  }

  playFestivalTune() {
    const notes = { E4: 329.63, G4: 392.00, B4: 493.88, E5: 659.25 };
    const melody = [
      { note: notes.E4, duration: 0.25 }, { note: notes.G4, duration: 0.25 },
      { note: notes.B4, duration: 0.25 }, { note: notes.E5, duration: 0.25 },
      { note: notes.B4, duration: 0.25 }, { note: notes.G4, duration: 0.25 },
      { note: notes.E4, duration: 0.5 }
    ];

    let currentTime = 0;
    melody.forEach(({ note, duration }) => {
      this.playNote(note, duration, currentTime, 'sine');
      currentTime += duration;
    });
  }

  async play() {
    console.log('🎵 Starting music playback...');
    
    // אם כבר מנגן, עוצר
    if (this.isPlaying) {
      console.log('Music already playing, stopping first...');
      this.stop();
      return true;
    }

    try {
      // בודק אם יש קבצי MP3 זמינים
      console.log('Checking for available MP3 files...');
      const hasMP3Files = await this.checkMusicFiles();
      
      if (hasMP3Files && this.musicFiles.length > 0) {
        console.log(`Found ${this.musicFiles.length} MP3 files, attempting MP3 playback...`);
        const randomSong = this.getRandomSong();
        console.log(`Selected song: ${randomSong}`);
        
        const mp3Success = await this.playMP3(randomSong);
        if (mp3Success) {
          console.log('✅ MP3 playback successful!');
          return true;
        } else {
          console.log('❌ MP3 playback failed, falling back to Web Audio...');
        }
      } else {
        console.log('No MP3 files found, using Web Audio fallback...');
      }
      
      // חזרה למוזיקה מובנית
      const webAudioSuccess = await this.fallbackToWebAudio();
      if (webAudioSuccess) {
        console.log('✅ Web Audio fallback successful!');
        return true;
      } else {
        console.log('❌ All audio methods failed');
        return false;
      }
      
    } catch (error) {
      console.error('🚨 Critical error in play():', error);
      
      if (error.message === 'user_interaction_required') {
        console.log('⚠️ User interaction required for audio playback');
        alert('אנא לחץ על כפתור המוזיקה שוב להפעלת המוזיקה');
        return false;
      }
      
      return false;
    }
  }

  stop() {
    this.isPlaying = false;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }
}

export default BirthdayMusicPlayer;
