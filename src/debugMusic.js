// Debug Music Function
function debugMusic() {
  console.log('🔍 === DEBUG MUSIC SYSTEM ===');
  console.log('1. Checking music player state...');
  console.log('- Is playing:', window.musicPlayer?.isPlaying || 'No music player found');
  console.log('- Current audio:', window.musicPlayer?.currentAudio || 'No current audio');
  console.log('- Music files:', window.musicPlayer?.musicFiles || 'No music files array');
  
  console.log('2. Testing file access...');
  const testFile = '/music/happy-birthday-220024.mp3';
  
  fetch(testFile, { method: 'HEAD' })
    .then(response => {
      console.log(`- File ${testFile} status:`, response.status);
      console.log('- File accessible:', response.ok);
      
      if (response.ok) {
        console.log('3. Testing audio object creation...');
        const testAudio = new Audio(testFile);
        
        testAudio.addEventListener('loadstart', () => console.log('- Audio loadstart event'));
        testAudio.addEventListener('loadeddata', () => console.log('- Audio loadeddata event'));
        testAudio.addEventListener('canplay', () => console.log('- Audio canplay event'));
        testAudio.addEventListener('canplaythrough', () => console.log('- Audio canplaythrough event'));
        testAudio.addEventListener('error', (e) => {
          console.error('- Audio error event:', e);
          console.error('- Error details:', testAudio.error);
        });
        
        console.log('4. Attempting test playback...');
        testAudio.volume = 0.5; // נמוך יותר לטסט
        testAudio.play()
          .then(() => {
            console.log('✅ Test audio playing successfully!');
            setTimeout(() => {
              testAudio.pause();
              console.log('Test audio stopped');
            }, 2000);
          })
          .catch(err => {
            console.error('❌ Test audio failed:', err);
            if (err.name === 'NotAllowedError') {
              console.log('⚠️ Browser blocked autoplay - user interaction required');
            }
          });
      }
    })
    .catch(err => {
      console.error('❌ File access failed:', err);
    });
}

// Export for use in other files
window.debugMusic = debugMusic;
