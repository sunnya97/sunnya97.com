---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<div class="site-container">
  <div class="custom-homepage">
    <header class="custom-header">
      <div class="custom-header-left">
        <span class="custom-logo">LOGO</span>
        <span class="custom-name">{{ site.title }}</span>
      </div>
      <nav class="custom-nav">
        <a href="#">ABOUT</a>
        <a href="#">BLOG</a>
      </nav>
    </header>
    <main class="custom-main">
      <div class="custom-main-left">
        <h1>HI, I'M<br>{{ site.title | upcase }}</h1>
        <div class="custom-socials">
          <a href="https://twitter.com/{{ site.twitter_username }}" class="custom-social-icon" target="_blank" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40" height="40"><path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" fill="currentColor"/></svg>
          </a>
          <a href="https://linkedin.com/in/{{ site.linkedin_username }}" class="custom-social-icon" target="_blank" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40" height="40"><path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" fill="currentColor"/></svg>
          </a>
          <a href="https://github.com/{{ site.github_username }}" class="custom-social-icon" target="_blank" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40" height="40"><path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>
      <div class="custom-main-right">
        <img src="/assets/images/sunny_hero.png" alt="Profile Photo" class="profile-photo">
      </div>
    </main>
  </div>
</div>

<section class="map-section">
  <div class="map-image-wrapper">
    <img src="/assets/images/basemap.png" alt="Illustrated Map" class="map-image" />
  </div>
</section>
