document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('clientName')?.value.trim();
        const email = document.getElementById('clientEmail')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('clientMessage')?.value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            displayMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate sending data to a server (replace with real backend later)
        const formData = { name, email, subject, message };
        console.log('Contact form submitted:', formData);

        // Show success message
        displayMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });

    function displayMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Smooth fade out after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 500);
        }, 5000);
    }
});





        window.onload = function() {
            document.getElementById('contactForm').addEventListener('submit', function(event) {
                event.preventDefault();
                // these IDs from the previous steps
                emailjs.sendForm("service_tbs4lmq","template_w40h3g8", this)
                    .then(() => {
                        alert('SUCCESS!');
                    }, (error) => {
                        alert('FAILED...', error);
                    });
            });
        }