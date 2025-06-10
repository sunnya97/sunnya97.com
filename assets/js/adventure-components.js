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

// Show/Hide Activity Functions
function showActivity(activityId) {
  // Hide all activities
  document.querySelectorAll('.activity-section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Show selected activity
  const activity = document.getElementById(`activity-${activityId}`);
  if (activity) {
    activity.style.display = 'block';
    activity.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Update badge states
  document.querySelectorAll('.badge-card').forEach(badge => {
    badge.classList.remove('active');
  });
  document.querySelector(`[data-activity="${activityId}"]`)?.classList.add('active');
}

function closeActivity() {
  document.querySelectorAll('.activity-section').forEach(section => {
    section.style.display = 'none';
  });
  
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