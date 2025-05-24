function toggleText(button) {
    const card = button.parentElement;
    const hiddenText = card.querySelector('.hidden-text');
    
    // Toggle the 'active' class
    hiddenText.classList.toggle('active');
    
    // Update button text
    button.textContent = hiddenText.classList.contains('active') ? 'Read Less' : 'Read More';
  }