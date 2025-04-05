// document.addEventListener('DOMContentLoaded', function() {
//     // Panchmukhi Face Details Toggle
//     document.querySelectorAll('.btn-more').forEach(btn => {
//         btn.addEventListener('click', function() {
//             const details = this.nextElementSibling;
//             details.classList.toggle('show');
//             this.textContent = details.classList.contains('show') ? 'Show Less' : 'Read More';
//         });
//     });

//     // Timeline Animation
//     const timelineItems = document.querySelectorAll('.timeline-item');
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if(entry.isIntersecting) {
//                 entry.target.style.opacity = 1;
//                 entry.target.style.transform = 'translateX(0)';
//             }
//         });
//     }, { threshold: 0.5 });

//     timelineItems.forEach(item => {
//         item.style.opacity = 0;
//         item.style.transform = 'translateX(-50px)';
//         observer.observe(item);
//     });

//     // Gallery Lightbox
//     baguetteBox.run('.gallery-grid', {
//         animation: 'fadeIn',
//         buttons: true,
//         async: true
//     });
// });

// Toggle face details with animation
document.querySelectorAll('.btn-more').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.face-card');
        const detail = card.querySelector('.face-detail');
        
        // Close all other open cards first
        document.querySelectorAll('.face-detail').forEach(d => {
            if(d !== detail) {
                d.classList.remove('show');
                d.previousElementSibling.textContent = 'Read More';
            }
        });
        
        // Toggle current card
        detail.classList.toggle('show');
        this.textContent = detail.classList.contains('show') ? 'Show Less' : 'Read More';
        
        // Scroll to show full content if needed
        if(detail.classList.contains('show')) {
            setTimeout(() => {
                detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    });
});

// Add hover effects
document.querySelectorAll('.face-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
});