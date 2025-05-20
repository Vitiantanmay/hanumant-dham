document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stats, .cow-cards, .donation-options').forEach(section => {
        observer.observe(section);
    });
    
    // Cow cards data
    const cows = [
        {
            name: "Gauri",
            image: "images/cow1.jpg",
            story: "Found injured on highway, now healthy and happy",
            age: "5 years"
        },
        {
            name: "Lakshmi",
            image: "images/cow1.jpg",
            story: "Abandoned after stopped giving milk",
            age: "7 years"
        },
        {
            name: "Sundari",
            image: "images/cow1.jpg",
            story: "Rescued from slaughterhouse, now our gentle giant",
            age: "4 years"
        }
    ];
    
    // Generate cow cards
    const cowCardsContainer = document.querySelector('.cow-cards');
    
    cows.forEach(cow => {
        const card = document.createElement('div');
        card.className = 'cow-card';
        card.innerHTML = `
            <img src="${cow.image}" alt="${cow.name}">
            <div class="cow-card-content">
                <h3>${cow.name}</h3>
                <p><strong>Age:</strong> ${cow.age}</p>
                <p>${cow.story}</p>
                <a href="#" class="btn primary">Sponsor ${cow.name}</a>
            </div>
        `;
        cowCardsContainer.appendChild(card);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll Animation
document.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  });

