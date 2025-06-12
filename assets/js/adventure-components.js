/**
 * Adventure Components
 * Reusable UI components for adventure activities
 */

// Activity Header Component
function createActivityHeader(title, stat, description) {
  return `
    <div class="activity-header">
      <h3 class="activity-title">${title}</h3>
      <div class="activity-stat">${stat}</div>
      <div class="activity-description">${description}</div>
    </div>
  `;
}

// Story Section Component
function createStorySection(paragraphs) {
  return `
    <div class="activity-story">
      ${paragraphs.map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
}

// Stat Grid Component
function createStatGrid(stats) {
  return `
    <div class="stat-grid">
      ${stats.map(stat => `
        <div class="stat-item">
          <div class="stat-value">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Achievement List Component
function createAchievementList(achievements) {
  return `
    <div class="achievement-list">
      <h4>Achievements</h4>
      <ul>
        ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Activity Section Component (Main wrapper)
function createActivitySection(id, content) {
  return `
    <section class="activity-section" id="activity-${id}" style="display: none;">
      <div class="activity-content">
        ${content}
      </div>
      <button class="close-activity" onclick="closeActivity()">×</button>
    </section>
  `;
}

// Activity Modal Instance
let activityModal = null;

// Show/Hide Activity Functions
function showActivity(activityId) {
  // Get activity content
  const activity = document.getElementById(`activity-${activityId}`);
  if (!activity) return;
  
  // Extract content from the activity section
  const activityContent = activity.querySelector('.activity-content');
  if (!activityContent) return;
  
  // Create modal with activity-specific options
  const modalOptions = {};
  
  // Special handling for content-heavy activities
  if (activityId === 'scuba' || activityId === 'motorcycling') {
    modalOptions.maxHeight = '75vh';
  }
  
  // Create modal if it doesn't exist or recreate with new options
  if (!activityModal) {
    activityModal = new Modal(modalOptions);
  } else if (modalOptions.maxHeight) {
    // If we need special height, create a new modal instance
    activityModal.destroy();
    activityModal = new Modal(modalOptions);
  }
  
  // Clone the content to avoid moving it from the original location
  const contentClone = activityContent.cloneNode(true);
  
  // Open modal with activity content
  activityModal.open(contentClone);
  
  // Load photos for this activity in the modal
  loadActivityPhotos(activityId, contentClone);
  
  // Update badge states
  document.querySelectorAll('.badge-card').forEach(badge => {
    badge.classList.remove('active');
  });
  document.querySelector(`[data-activity="${activityId}"]`)?.classList.add('active');
}

// Function to load photos for an activity
function loadActivityPhotos(activityId, containerElement) {
  // Get photo data from the main page (now globally accessible)
  if (typeof window.photoData !== 'undefined' && window.photoData[activityId]) {
    const photoContainer = containerElement.querySelector(`#${activityId}-photos`);
    
    if (photoContainer && typeof PhotoGrid !== 'undefined') {
      PhotoGrid.create(photoContainer, window.photoData[activityId], {
        groupName: activityId,
        columns: 'auto-fit',
        minColumnWidth: '200px',
        gap: '1rem'
      });
    }
  }
}

function closeActivity() {
  if (activityModal && activityModal.isOpen) {
    activityModal.close();
  }
  
  // Reset badge states
  document.querySelectorAll('.badge-card').forEach(badge => {
    badge.classList.remove('active');
  });
}

// Export functions for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createActivityHeader,
    createStorySection,
    createStatGrid,
    createAchievementList,
    createActivitySection,
    showActivity,
    closeActivity
  };
}