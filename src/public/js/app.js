// Tax Calculator Frontend JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.tax-form');
    const incomeInput = document.getElementById('income');
    
    // Format income input with commas
    incomeInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/,/g, '');
        if (!isNaN(value) && value !== '') {
            // Format with commas but keep decimal places
            const parts = value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            e.target.value = parts.join('.');
        }
    });
    
    // Remove commas before form submission
    form.addEventListener('submit', function(e) {
        const cleanValue = incomeInput.value.replace(/,/g, '');
        incomeInput.value = cleanValue;
    });
    
    // Add loading state to calculate button
    const calculateBtn = document.querySelector('.calculate-btn');
    form.addEventListener('submit', function() {
        calculateBtn.textContent = 'Calculating...';
        calculateBtn.disabled = true;
    });
    
    // Animate results when they appear
    const results = document.querySelector('.results');
    if (results) {
        results.style.opacity = '0';
        results.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            results.style.transition = 'all 0.5s ease';
            results.style.opacity = '1';
            results.style.transform = 'translateY(0)';
        }, 100);
    }
});