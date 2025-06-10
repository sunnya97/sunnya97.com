/**
 * Lightbox Component
 * A reusable lightbox component for displaying images with navigation
 */
class Lightbox {
  constructor(options = {}) {
    this.options = {
      // CSS selectors
      triggerSelector: options.triggerSelector || '[data-lightbox], [data-lightbox-group]',
      
      // Lightbox container ID (will be created if doesn't exist)
      containerId: options.containerId || 'lightbox-container',
      
      // Callbacks
      onOpen: options.onOpen || null,
      onClose: options.onClose || null,
      onChange: options.onChange || null,
      
      // Animation settings
      animationDuration: options.animationDuration || 300,
      
      // Auto-initialize on creation
      autoInit: options.autoInit !== false
    };
    
    this.currentImages = [];
    this.currentIndex = 0;
    this.isOpen = false;
    
    if (this.options.autoInit) {
      this.init();
    }
  }
  
  init() {
    this.createLightboxHTML();
    this.bindEvents();
    this.attachTriggers();
  }
  
  createLightboxHTML() {
    // Check if lightbox already exists
    if (document.getElementById(this.options.containerId)) {
      this.lightboxEl = document.getElementById(this.options.containerId);
      return;
    }
    
    // Create lightbox HTML
    const lightboxHTML = `
      <div class="lightbox" id="${this.options.containerId}">
        <div class="lightbox-content">
          <img class="lightbox-image" src="" alt="">
          <div class="lightbox-caption"></div>
          <button class="lightbox-close" type="button">&times;</button>
          <button class="lightbox-nav lightbox-prev" type="button">&#8249;</button>
          <button class="lightbox-nav lightbox-next" type="button">&#8250;</button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.lightboxEl = document.getElementById(this.options.containerId);
    
    // Get elements
    this.imageEl = this.lightboxEl.querySelector('.lightbox-image');
    this.captionEl = this.lightboxEl.querySelector('.lightbox-caption');
    this.closeEl = this.lightboxEl.querySelector('.lightbox-close');
    this.prevEl = this.lightboxEl.querySelector('.lightbox-prev');
    this.nextEl = this.lightboxEl.querySelector('.lightbox-next');
  }
  
  bindEvents() {
    // Close events
    this.closeEl.addEventListener('click', () => this.close());
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl) this.close();
    });
    
    // Navigation events
    this.prevEl.addEventListener('click', () => this.prev());
    this.nextEl.addEventListener('click', () => this.next());
    
    // Keyboard events
    this.keyHandler = (e) => {
      if (!this.isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    };
    
    document.addEventListener('keydown', this.keyHandler);
  }
  
  attachTriggers() {
    // Remove existing listeners to prevent duplicates
    this.removeAllListeners();
    
    // Auto-attach to elements with data-lightbox attribute
    const triggers = document.querySelectorAll(this.options.triggerSelector);
    this.triggerListeners = [];
    
    triggers.forEach(trigger => {
      const handler = (e) => {
        e.preventDefault();
        this.openFromTrigger(trigger);
      };
      
      trigger.addEventListener('click', handler);
      this.triggerListeners.push({ element: trigger, handler });
    });
  }
  
  removeAllListeners() {
    if (this.triggerListeners) {
      this.triggerListeners.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      this.triggerListeners = [];
    }
  }
  
  openFromTrigger(trigger) {
    // Get image data from trigger
    const src = trigger.getAttribute('data-lightbox-src') || trigger.src || trigger.href;
    const caption = trigger.getAttribute('data-lightbox-caption') || trigger.alt || '';
    const group = trigger.getAttribute('data-lightbox-group');
    
    let images = [{ src, caption }];
    let startIndex = 0;
    
    // If part of a group, collect all images in that group
    if (group) {
      const groupTriggers = document.querySelectorAll(`[data-lightbox-group="${group}"]`);
      images = Array.from(groupTriggers).map(t => ({
        src: t.getAttribute('data-lightbox-src') || t.src || t.href,
        caption: t.getAttribute('data-lightbox-caption') || t.alt || ''
      }));
      
      // Find the index of the clicked trigger
      startIndex = Array.from(groupTriggers).indexOf(trigger);
    }
    
    this.open(images, startIndex);
  }
  
  open(images, startIndex = 0) {
    this.currentImages = images;
    this.currentIndex = startIndex;
    this.isOpen = true;
    
    this.updateImage();
    this.updateNavigation();
    
    // Show lightbox
    this.lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Callback
    if (this.options.onOpen) {
      this.options.onOpen(this.currentImages[this.currentIndex], this.currentIndex);
    }
  }
  
  close() {
    this.isOpen = false;
    this.lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
    
    // Callback
    if (this.options.onClose) {
      this.options.onClose();
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateImage();
      this.updateNavigation();
      
      if (this.options.onChange) {
        this.options.onChange(this.currentImages[this.currentIndex], this.currentIndex);
      }
    }
  }
  
  next() {
    if (this.currentIndex < this.currentImages.length - 1) {
      this.currentIndex++;
      this.updateImage();
      this.updateNavigation();
      
      if (this.options.onChange) {
        this.options.onChange(this.currentImages[this.currentIndex], this.currentIndex);
      }
    }
  }
  
  updateImage() {
    const currentImage = this.currentImages[this.currentIndex];
    this.imageEl.src = currentImage.src;
    this.captionEl.textContent = currentImage.caption || '';
    
    // Hide caption if empty
    this.captionEl.style.display = currentImage.caption ? 'block' : 'none';
  }
  
  updateNavigation() {
    // Update prev/next buttons
    this.prevEl.disabled = this.currentIndex === 0;
    this.nextEl.disabled = this.currentIndex === this.currentImages.length - 1;
    
    // Hide navigation if only one image
    if (this.currentImages.length <= 1) {
      this.prevEl.style.display = 'none';
      this.nextEl.style.display = 'none';
    } else {
      this.prevEl.style.display = 'flex';
      this.nextEl.style.display = 'flex';
    }
  }
  
  // Public methods for manual control
  openImages(images, startIndex = 0) {
    this.open(images, startIndex);
  }
  
  addImages(images, groupName) {
    // Add images to a specific group programmatically
    images.forEach((image, index) => {
      const trigger = document.createElement('a');
      trigger.href = image.src;
      trigger.setAttribute('data-lightbox-group', groupName);
      trigger.setAttribute('data-lightbox-caption', image.caption || '');
      trigger.style.display = 'none';
      document.body.appendChild(trigger);
    });
    
    this.attachTriggers();
  }
  
  destroy() {
    // Remove event listeners
    document.removeEventListener('keydown', this.keyHandler);
    this.removeAllListeners();
    
    // Remove lightbox element
    if (this.lightboxEl) {
      this.lightboxEl.remove();
    }
  }
}

// Auto-initialize default lightbox
document.addEventListener('DOMContentLoaded', function() {
  if (typeof window.lightboxAutoInit === 'undefined' || window.lightboxAutoInit) {
    window.lightbox = new Lightbox();
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Lightbox;
}