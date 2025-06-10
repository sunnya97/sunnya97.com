/**
 * Photo Grid Component
 * Reusable component for displaying photo grids with lightbox integration
 */
class PhotoGrid {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      groupName: options.groupName || 'default',
      gridClass: options.gridClass || 'photo-grid',
      imageClass: options.imageClass || 'photo-grid-image',
      captionClass: options.captionClass || 'photo-caption',
      showCaptions: options.showCaptions !== false,
      imageHeight: options.imageHeight || '200px',
      columns: options.columns || 'auto-fit',
      minColumnWidth: options.minColumnWidth || '200px',
      gap: options.gap || '1rem',
      ...options
    };
  }

  render(images) {
    if (!this.container || !images || images.length === 0) {
      if (this.container) this.container.innerHTML = '';
      return;
    }

    // Create grid HTML
    const gridHTML = `
      <div class="${this.options.gridClass}" style="
        display: grid;
        grid-template-columns: repeat(${this.options.columns}, minmax(${this.options.minColumnWidth}, 1fr));
        gap: ${this.options.gap};
      ">
        ${images.map((image, index) => this.createImageHTML(image, index)).join('')}
      </div>
    `;

    this.container.innerHTML = gridHTML;

    // Re-attach lightbox if available
    if (window.lightbox) {
      window.lightbox.attachTriggers();
    }
  }

  createImageHTML(image, index) {
    const src = typeof image === 'string' ? image : image.src;
    const caption = typeof image === 'object' ? image.caption : '';
    const alt = typeof image === 'object' ? (image.alt || caption) : '';

    return `
      <div class="photo-grid-item" style="position: relative; overflow: hidden; border-radius: 8px;">
        <img src="${src}" 
             alt="${alt}" 
             class="${this.options.imageClass}" 
             data-lightbox-group="${this.options.groupName}"
             data-lightbox-src="${src}"
             data-lightbox-caption="${caption}"
             style="
               width: 100%;
               height: ${this.options.imageHeight};
               object-fit: cover;
               border-radius: 8px;
               border: 2px solid rgba(212, 175, 55, 0.3);
               transition: all 0.3s ease;
               cursor: pointer;
             ">
        ${this.options.showCaptions && caption ? `
          <div class="${this.options.captionClass}" style="
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            padding: 2rem 1rem 0.8rem 1rem;
            font-size: 0.9rem;
            line-height: 1.3;
            opacity: 0;
            transform: translateY(100%);
            transition: all 0.3s ease;
            border-radius: 0 0 6px 6px;
          ">${caption}</div>
        ` : ''}
      </div>
    `;
  }

  // Static method for quick setup
  static create(container, images, options = {}) {
    const grid = new PhotoGrid(container, options);
    grid.render(images);
    return grid;
  }
}

// Add hover effects via CSS
if (!document.getElementById('photo-grid-styles')) {
  const style = document.createElement('style');
  style.id = 'photo-grid-styles';
  style.textContent = `
    .photo-grid-item:hover .photo-grid-image,
    .photo-grid-item:hover img {
      transform: scale(1.05);
      border-color: var(--primary-color, #d4af37) !important;
    }
    .photo-grid-item:hover .photo-caption {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhotoGrid;
}