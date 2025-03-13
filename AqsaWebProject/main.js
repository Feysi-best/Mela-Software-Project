
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});
// Closing menu by clicking outside on the mobile
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
    }
});
//Closing menu by resizing desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
    }
});
// This is for Contact Form Handling
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.form-input');
const alertContainer = document.createElement('div');
alertContainer.className = 'form-alert';
document.body.appendChild(alertContainer);

const showAlert = (message, type = 'success') => {
    alertContainer.textContent = message;
    alertContainer.className = `form-alert ${type}-alert`;
    setTimeout(() => {
        alertContainer.className = 'form-alert';
    }, 5000);
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
        name: contactForm.querySelector('input[type="text"]').value.trim(),
        email: contactForm.querySelector('input[type="email"]').value.trim(),
        message: contactForm.querySelector('textarea').value.trim()
    };

    if (!formData.name) {
        showAlert('Please enter your name', 'error');
        return;
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    if (formData.message.length < 10) {
        showAlert('Message must be at least 10 characters long', 'error');
        return;
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This is for the Reset form
        contactForm.reset();
        showAlert('Message sent successfully! We\'ll respond within 24 hours.');
    } catch (error) {
        showAlert('Failed to send message. Please try again later.', 'error');
    }
};

contactForm.addEventListener('submit', handleSubmit);

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
        }
    });
});