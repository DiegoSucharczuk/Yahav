// Photo Manager - מנהל תמונות רנדומליות
class PhotoManager {
  constructor() {
    // ננסה לגלות תמונות אוטומטית
    this.imageFiles = [
      '/images/Yahav.jpeg',
      '/images/WhatsApp Image 2025-07-28 at 07.42.56.jpeg',
      '/images/WhatsApp Image 2025-07-28 at 07.42.56 (1).jpeg',
      '/images/WhatsApp Image 2025-07-28 at 07.42.56 (2).jpeg',
      '/images/WhatsApp Image 2025-07-28 at 07.42.56 (3).jpeg',
      '/images/WhatsApp Image 2025-07-28 at 07.42.57.jpeg'
    ];
    this.availableImages = [];
    this.currentImageIndex = 0;
    this.rotationInterval = null;
    this.rotationSpeed = 4000; // 4 שניות
  }

  async checkAvailableImages() {
    this.availableImages = [];
    
    for (const imagePath of this.imageFiles) {
      try {
        const response = await fetch(imagePath, { method: 'HEAD' });
        if (response.ok) {
          this.availableImages.push(imagePath);
        }
      } catch (error) {
        console.log(`Image not found: ${imagePath}`);
      }
    }
    
    console.log(`Found ${this.availableImages.length} images`);
    return this.availableImages.length > 0;
  }

  getRandomImage() {
    if (this.availableImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.availableImages.length);
    const randomImage = this.availableImages[randomIndex];
    console.log(`🎲 בחירת תמונה רנדומלית: ${randomIndex + 1}/${this.availableImages.length} - ${randomImage}`);
    return randomImage;
  }

  getNextImage() {
    if (this.availableImages.length === 0) return null;
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.availableImages.length;
    return this.availableImages[this.currentImageIndex];
  }

  async loadRandomImage(container) {
    const hasImages = await this.checkAvailableImages();
    
    if (!hasImages) {
      this.showPlaceholder(container);
      return false;
    }

    const imagePath = this.getRandomImage();
    this.displayImage(container, imagePath);
    return true;
  }

  displayImage(container, imagePath) {
    // אפקט fade out
    container.style.opacity = '0.3';
    container.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      container.innerHTML = `
        <img src="${imagePath}" alt="תמונה של יהב" class="uploaded-photo" 
             onload="this.parentElement.style.opacity='1'; this.parentElement.style.transform='scale(1)';"
             onerror="this.parentElement.querySelector('.photo-error').style.display='block'; this.style.display='none';">
        <div class="photo-error" style="display: none;">
          <span>❌ שגיאה בטעינת התמונה</span>
        </div>
      `;
    }, 300);
  }

  showPlaceholder(container) {
    container.innerHTML = `
      <div class="photo-placeholder-content">
        <div class="placeholder-icon">📸</div>
        <div class="placeholder-text">
          <div>תמונות של יהב</div>
          <div class="placeholder-subtext">העלה תמונות לתיקיית images/</div>
        </div>
      </div>
    `;
  }

  startRotation(container, interval = 4000) {
    console.log('🔄 מתחיל סיבוב תמונות כל', interval/1000, 'שניות');
    
    // נוודא שיש תמונות זמינות
    if (this.availableImages.length === 0) {
      this.checkAvailableImages().then(() => {
        if (this.availableImages.length > 0) {
          this.startActualRotation(container, interval);
        }
      });
    } else {
      this.startActualRotation(container, interval);
    }
  }
  
  startActualRotation(container, interval) {
    // עצירת סיבוב קיים
    this.stopRotation();
    
    console.log(`📷 מתחיל סיבוב עם ${this.availableImages.length} תמונות`);
    
    // התחלת סיבוב חדש
    this.rotationInterval = setInterval(() => {
      const randomImage = this.getRandomImage();
      if (randomImage) {
        console.log('🖼️ מחליף לתמונה:', randomImage);
        this.displayImage(container, randomImage);
        this.flashEffect(container);
      }
    }, interval);
  }

  stopRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }

  flashEffect(container) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,215,0,0.6));
      border-radius: 50%;
      pointer-events: none;
      animation: photoFlash 0.6s ease-out;
      z-index: 10;
    `;
    
    // הוספת אנימציית הבזקה
    if (!document.getElementById('photoFlashStyle')) {
      const style = document.createElement('style');
      style.id = 'photoFlashStyle';
      style.textContent = `
        @keyframes photoFlash {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
    
    container.appendChild(flash);
    
    setTimeout(() => {
      if (container.contains(flash)) {
        container.removeChild(flash);
      }
    }, 600);
  }

  // פונקציה להחלפה ידנית של תמונה
  async changeImage(container) {
    console.log('🔄 מחליף תמונה...');
    
    if (this.availableImages.length === 0) {
      await this.checkAvailableImages();
    }
    
    if (this.availableImages.length > 0) {
      const nextImage = this.getNextImage();
      console.log('📷 תמונה חדשה:', nextImage);
      this.displayImage(container, nextImage);
      this.flashEffect(container);
      return true;
    } else {
      // אם אין תמונות נוספות, נעשה אפקט ויזואלי על התמונה הקיימת
      console.log('📸 מפעיל אפקט על התמונה הקיימת');
      this.applyImageEffect(container);
      return true;
    }
  }
  
  // אפקט ויזואלי לתמונה אחת
  applyImageEffect(container) {
    const img = container.querySelector('img');
    if (!img) return;
    
    // רשימת אפקטים אקראיים
    const effects = [
      'scale(1.1) rotate(5deg)',
      'scale(0.9) rotate(-5deg)', 
      'scale(1.05) rotate(2deg)',
      'scale(0.95) rotate(-2deg)',
      'scale(1.1) rotateY(15deg)',
      'scale(1.05) skew(2deg)',
    ];
    
    const filters = [
      'brightness(120%) contrast(110%)',
      'hue-rotate(30deg) saturate(120%)',
      'sepia(20%) brightness(110%)',
      'contrast(120%) brightness(105%)',
      'saturate(130%) brightness(110%)',
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    const randomFilter = filters[Math.floor(Math.random() * filters.length)];
    
    // החלת האפקט
    img.style.transition = 'all 0.5s ease';
    img.style.transform = randomEffect;
    img.style.filter = randomFilter;
    
    // החזרה למצב רגיל אחרי שניות
    setTimeout(() => {
      img.style.transform = 'scale(1) rotate(0deg)';
      img.style.filter = 'none';
    }, 2000);
    
    // אפקט הבזק
    this.flashEffect(container);
  }
}

export default PhotoManager;
