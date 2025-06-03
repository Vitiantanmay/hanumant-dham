document.addEventListener('DOMContentLoaded', function() {
    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const expandedImg = document.getElementById('expanded-img');
    const imgCaption = document.querySelector('.img-caption');
    const closeGallery = document.querySelector('.close-gallery');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const viewGalleryBtn = document.querySelector('.view-gallery-btn');
    
    let currentIndex = 0;
    const galleryImages = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        caption: item.querySelector('.img-overlay span').textContent
    }));
    
    // Open gallery from hero button
    viewGalleryBtn.addEventListener('click', function() {
        openGallery(0);
    });
    
    // Open gallery from thumbnail click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openGallery(index);
        });
    });
    
    function openGallery(index) {
        currentIndex = index;
        updateGalleryImage();
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function updateGalleryImage() {
        expandedImg.src = galleryImages[currentIndex].src;
        expandedImg.alt = galleryImages[currentIndex].alt;
        imgCaption.textContent = galleryImages[currentIndex].caption;
    }
    
    closeGallery.addEventListener('click', function() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGalleryImage();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateGalleryImage();
    });
    
    // Close modal when clicking outside image
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (galleryModal.style.display === 'block') {
            if (e.key === 'Escape') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timing-card, .feature-card, .event-item, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.timing-card, .feature-card, .event-item, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});