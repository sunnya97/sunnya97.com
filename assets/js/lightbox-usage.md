# Lightbox Component Usage

A reusable lightbox component for displaying images with navigation and captions.

## Basic Usage

### 1. Include the files
```html
<link rel="stylesheet" href="/assets/css/lightbox.css">
<script src="/assets/js/lightbox.js"></script>
```

### 2. Add data attributes to your images
```html
<!-- Single image -->
<img src="photo.jpg" alt="Description" data-lightbox data-lightbox-caption="My photo caption">

<!-- Group of images (will have navigation between them) -->
<img src="photo1.jpg" data-lightbox-group="gallery" data-lightbox-caption="First photo">
<img src="photo2.jpg" data-lightbox-group="gallery" data-lightbox-caption="Second photo">
<img src="photo3.jpg" data-lightbox-group="gallery" data-lightbox-caption="Third photo">
```

### 3. The lightbox will automatically initialize
The component auto-initializes when the DOM loads and handles all clicks automatically.

## Data Attributes

- `data-lightbox`: Basic trigger (for single images)
- `data-lightbox-group="groupname"`: Groups images together for navigation
- `data-lightbox-src="url"`: Custom source URL (if different from src)
- `data-lightbox-caption="text"`: Caption text to display

## Advanced Usage

### Manual Initialization
```javascript
// Disable auto-init
window.lightboxAutoInit = false;

// Create custom lightbox
const myLightbox = new Lightbox({
  triggerSelector: '.my-gallery img',
  onOpen: (image, index) => console.log('Opened:', image),
  onClose: () => console.log('Closed'),
  onChange: (image, index) => console.log('Changed to:', index)
});
```

### Programmatic Control
```javascript
// Open specific images
const images = [
  { src: 'photo1.jpg', caption: 'First photo' },
  { src: 'photo2.jpg', caption: 'Second photo' }
];
myLightbox.openImages(images, 0); // Open first image

// Add images to a group programmatically
myLightbox.addImages(images, 'my-group');
```

## Features

- ✅ Click to open large image view
- ✅ Navigation between grouped images
- ✅ Keyboard navigation (←/→ arrows, Escape)
- ✅ Click outside to close
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Caption display
- ✅ Multiple instances support
- ✅ Auto-initialization
- ✅ Programmatic control

## Examples

### Photo Gallery
```html
<div class="gallery">
  <img src="thumb1.jpg" data-lightbox-group="vacation" data-lightbox-src="full1.jpg" data-lightbox-caption="Beach sunset">
  <img src="thumb2.jpg" data-lightbox-group="vacation" data-lightbox-src="full2.jpg" data-lightbox-caption="Mountain view">
  <img src="thumb3.jpg" data-lightbox-group="vacation" data-lightbox-src="full3.jpg" data-lightbox-caption="City skyline">
</div>
```

### Single Image
```html
<img src="hero-image.jpg" data-lightbox data-lightbox-caption="Hero image description">
```

### Links to Images
```html
<a href="large-image.jpg" data-lightbox data-lightbox-caption="Full size view">
  <img src="thumbnail.jpg" alt="Thumbnail">
</a>
```

## Browser Support
- All modern browsers
- Mobile responsive
- Touch-friendly navigation