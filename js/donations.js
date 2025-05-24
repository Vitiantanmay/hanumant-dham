document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if(content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Payment Method Switching
    const methodBtns = document.querySelectorAll('.method-btn');
    const methodContents = document.querySelectorAll('.method-content');
    
    methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const methodId = btn.getAttribute('data-method');
            
            // Update active method button
            methodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding content
            methodContents.forEach(content => {
                content.classList.remove('active');
                if(content.id === methodId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Donation Amount Selection
    const amountOptions = document.querySelectorAll('.amount-option:not(.custom-amount)');
    const customAmountInput = document.getElementById('custom-amount');
    let selectedAmount = 1000; // Default amount
    
    amountOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update selected amount
            selectedAmount = parseInt(option.getAttribute('data-amount'));
            
            // Clear custom amount if any
            customAmountInput.value = '';
        });
    });
    
    // Handle custom amount
    customAmountInput.addEventListener('input', () => {
        if(customAmountInput.value) {
            // Remove selected class from fixed amounts
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Update selected amount
            selectedAmount = parseInt(customAmountInput.value) || 0;
        }
    });
    
    // Copy UPI ID
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const upiId = this.getAttribute('data-text');
            navigator.clipboard.writeText(upiId).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // Animate impact meter
    const meter = document.querySelector('.meter');
    const percent = parseInt(meter.getAttribute('data-percent'));
    meter.style.background = `conic-gradient(var(--primary) ${percent}%, #eee 0)`;
    
    // Razorpay Integration
    // const donateButtons = document.querySelectorAll('.btn.primary:not([data-plan])');
    // const subscribeButtons = document.querySelectorAll('.btn.primary[data-plan]');
    
    // One-time donations
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if(this.type === 'submit') return;
            
            e.preventDefault();
            processDonation(selectedAmount);
        });
    });
    
    // Recurring subscriptions
    subscribeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const amount = parseInt(this.getAttribute('data-plan'));
            processDonation(amount, true);
        });
    });
    
    // Card form submission
    const cardForm = document.getElementById('card-form');
    if(cardForm) {
        cardForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processDonation(selectedAmount);
        });
    }
    
    // Process donation via Razorpay
    function processDonation(amount, isRecurring = false) {
        if(amount < 100) {
            alert('Minimum donation amount is ₹100');
            return;
        }
        
        // In a real implementation, you would make an AJAX call to your server
        // to create an order and get the Razorpay options
        
        // This is a mock implementation - replace with actual server-side code
        // const options = {
        //     key: 'rzp_test_YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        //     amount: amount * 100, // Razorpay expects amount in paise
        //     currency: 'INR',
        //     name: 'Hanumant Dham',
        //     description: isRecurring ? 'Monthly Cow Support' : 'Cow Rescue Donation',
        //     image: 'assets/logo.png',
        //     handler: function(response) {
        //         // On successful payment
        //         alert('Thank you for your donation! A receipt will be sent to your email.');
                
        //         // In real implementation, verify payment on server
        //         // and save to database
        //         console.log(response);
        //     },
        //     prefill: {
        //         name: 'Donor Name',
        //         email: 'donor@example.com',
        //         contact: '9999999999'
        //     },
        //     notes: {
        //         address: 'Hanumant Dham Cow Shelter',
        //         purpose: isRecurring ? 'Monthly Support' : 'One-time Donation'
        //     },
        //     theme: {
        //         color: '#8e6c88'
        //     }
        // };
        
        if(isRecurring) {
            options.recurring = true;
            options.subscription_id = 'sub_YOUR_SUBSCRIPTION_ID'; // From server
        }
        
        const rzp = new Razorpay(options);
        rzp.open();
    }
    
    // Initialize any animations
    initializeAnimations();
});

function initializeAnimations() {
    // Animate elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.impact-card, .membership-card, .benefits-card').forEach(el => {
        observer.observe(el);
    });
}