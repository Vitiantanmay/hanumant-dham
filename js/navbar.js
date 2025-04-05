document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    let inactivityTimer;
  
    // Hide navbar after 5 seconds of inactivity
    function startInactivityTimer() {
      // Clear any existing timer
      clearTimeout(inactivityTimer);
      
      // Set new timer (5000ms = 5 seconds)
      inactivityTimer = setTimeout(() => {
        if (!navbar.classList.contains('menu-open')) {
          navbar.classList.add('hidden');
        }
      }, 3000);
    }
  
    // Show navbar and reset timer
    function showNavbar() {
      navbar.classList.remove('hidden');
      startInactivityTimer();
    }
  
    // Events that should show navbar and reset timer
    const activityEvents = [
      'mousemove', 
      'mousedown', 
      'scroll', 
      'keydown',
      'touchstart',
      'click'
    ];
  
    // Set up event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, showNavbar);
    });
  
    // Hamburger menu toggle (keep navbar visible when menu is open)
    hamburger.addEventListener('click', function() {
      navbar.classList.toggle('menu-open');
      if (navbar.classList.contains('menu-open')) {
        clearTimeout(inactivityTimer);
        navbar.classList.remove('hidden');
      } else {
        startInactivityTimer();
      }
    });
  
    // Start the initial timer
    startInactivityTimer();
  });