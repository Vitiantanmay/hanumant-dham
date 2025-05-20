
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