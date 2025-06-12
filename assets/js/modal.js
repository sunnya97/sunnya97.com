/**
 * Universal Modal Component
 * A reusable modal system for the entire site
 * 
 * Usage Examples:
 * 
 * // Quick modal with text content
 * Modal.show('<h2>Hello World</h2><p>This is a modal!</p>');
 * 
 * // Modal with custom options
 * const modal = new Modal({
 *   maxWidth: '600px',
 *   closeOnBackdrop: false
 * });
 * modal.open('<div>Custom content</div>');
 * 
 * // Modal with HTML element
 * const element = document.createElement('div');
 * element.innerHTML = '<p>Dynamic content</p>';
 * modal.open(element);
 * 
 * // Listen to modal events
 * modal.modalElement.addEventListener('modal:opened', () => {
 *   console.log('Modal opened');
 * });
 * modal.modalElement.addEventListener('modal:closed', () => {
 *   console.log('Modal closed');
 * });
 */

class Modal {
  constructor(options = {}) {
    this.options = {
      maxWidth: '1200px',
      maxHeight: 'calc(100vh - 4rem)',
      closeOnBackdrop: true,
      closeOnEsc: true,
      preventBodyScroll: true,
      showCloseButton: true,
      ...options
    };
    
    this.isOpen = false;
    this.modalElement = null;
    this.originalBodyOverflow = '';
    
    this.init();
  }

  init() {
    // Create modal HTML structure
    this.modalElement = document.createElement('div');
    this.modalElement.className = 'modal-overlay';
    this.modalElement.innerHTML = `
      <div class="modal-container">
        <div class="modal-content">
          ${this.options.showCloseButton ? '<button class="modal-close" aria-label="Close modal">×</button>' : ''}
          <div class="modal-body"></div>
        </div>
      </div>
    `;
    
    // Add styles if not already present
    this.addStyles();
    
    // Bind event listeners
    this.bindEvents();
    
    // Append to body (hidden initially)
    document.body.appendChild(this.modalElement);
  }

  addStyles() {
    const styleId = 'modal-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .modal-overlay.modal-show {
        display: flex;
        opacity: 1;
      }

      .modal-container {
        max-width: var(--modal-max-width, 1200px);
        max-height: var(--modal-max-height, calc(100vh - 4rem));
        width: 90%;
        margin: 2rem;
        transform: scale(0.9) translateY(-20px);
        transition: transform 0.3s ease;
      }

      .modal-overlay.modal-show .modal-container {
        transform: scale(1) translateY(0);
      }

      .modal-content {
        background: var(--background-color, #fff);
        border: 2px solid var(--primary-color, #d4af37);
        border-radius: 12px;
        position: relative;
        max-height: 100%;
        overflow: hidden;
      }

      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--primary-color, #d4af37);
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
        z-index: 10;
        transition: color 0.2s ease;
      }

      .modal-close:hover {
        color: var(--secondary-color, #b8860b);
      }

      .modal-body {
        padding: 3rem;
        overflow-y: auto;
        max-height: calc(var(--modal-max-height, calc(100vh - 4rem)) - 4rem);
      }

      @media (max-width: 768px) {
        .modal-container {
          width: 95%;
          margin: 1rem;
          max-height: calc(100vh - 2rem);
        }
        
        .modal-body {
          padding: 2rem;
          overflow-y: auto;
          max-height: calc(var(--modal-max-height, calc(100vh - 2rem)) - 3rem);
        }
      }

      @media (max-height: 600px) {
        .modal-container {
          max-height: calc(100vh - 2rem);
          margin: 1rem;
        }
        
        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(var(--modal-max-height, calc(100vh - 2rem)) - 2rem);
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  bindEvents() {
    // Close button
    if (this.options.showCloseButton) {
      const closeBtn = this.modalElement.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.options.closeOnBackdrop) {
      this.modalElement.addEventListener('click', (e) => {
        if (e.target === this.modalElement) {
          this.close();
        }
      });
    }

    // ESC key
    if (this.options.closeOnEsc) {
      this.escHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escHandler);
    }
  }

  open(content) {
    if (this.isOpen) return;

    // Set custom CSS variables for sizing
    this.modalElement.style.setProperty('--modal-max-width', this.options.maxWidth);
    this.modalElement.style.setProperty('--modal-max-height', this.options.maxHeight);
    
    // Add content
    const modalBody = this.modalElement.querySelector('.modal-body');
    if (typeof content === 'string') {
      modalBody.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      modalBody.innerHTML = '';
      modalBody.appendChild(content);
    }

    // Prevent body scroll
    if (this.options.preventBodyScroll) {
      this.originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    // Show modal with animation
    this.modalElement.style.display = 'flex';
    // Force reflow before adding show class for animation
    this.modalElement.offsetHeight;
    this.modalElement.classList.add('modal-show');
    
    this.isOpen = true;

    // Emit custom event
    this.modalElement.dispatchEvent(new CustomEvent('modal:opened'));
  }

  close() {
    if (!this.isOpen) return;

    // Remove show class for animation
    this.modalElement.classList.remove('modal-show');
    
    // Hide after animation completes
    setTimeout(() => {
      this.modalElement.style.display = 'none';
    }, 300);

    // Restore body scroll
    if (this.options.preventBodyScroll) {
      document.body.style.overflow = this.originalBodyOverflow;
    }

    this.isOpen = false;

    // Emit custom event
    this.modalElement.dispatchEvent(new CustomEvent('modal:closed'));
  }

  destroy() {
    if (this.options.closeOnEsc && this.escHandler) {
      document.removeEventListener('keydown', this.escHandler);
    }
    
    if (this.modalElement && this.modalElement.parentNode) {
      this.modalElement.parentNode.removeChild(this.modalElement);
    }
  }

  // Static method to create and show modal in one call
  static show(content, options = {}) {
    const modal = new Modal(options);
    modal.open(content);
    return modal;
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
} else if (typeof window !== 'undefined') {
  window.Modal = Modal;
}