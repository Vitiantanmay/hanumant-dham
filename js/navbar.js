document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const dropdowns = document.querySelectorAll('.dropdown');
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
      }, 5000);
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
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.matches('.dropdown-btn')) {
        dropdowns.forEach(dropdown => {
          const content = dropdown.querySelector('.dropdown-content');
          if (content.style.display === 'block') {
            content.style.display = 'none';
          }
        });
      }
    });
  
    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector('.dropdown-btn');
      btn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          dropdown.classList.toggle('active');
        }
      });
    });
  
    // Start the initial timer
    startInactivityTimer();
});





  document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector(".dropdown-btn");

      btn.addEventListener("click", function (e) {
        e.preventDefault(); // Stop page jump/navigation
        e.stopPropagation(); // Stop bubbling up to document

        // Close all others
        dropdowns.forEach(d => {
          if (d !== dropdown) d.classList.remove("active");
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
      dropdowns.forEach(d => {
        if (!d.contains(event.target)) {
          d.classList.remove("active");
        }
      });
    });
  });



