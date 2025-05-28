// contact.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const popup = document.getElementById('popup');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();  // never let the browser redirect

        // 1) make sure all required fields are non-empty
        const allFilled = Array.from(this.querySelectorAll('[required]'))
            .every(f => f.value.trim() !== '');
        if (!allFilled) {
            showPopup('Please fill all required fields.', true);
            return;
        }

        // 2) fire-and-forget POST (no-cors so we don’t block)
        fetch(this.action, {
            method: 'POST',
            mode: 'no-cors',
            body: new FormData(this)
        }).catch(err => console.warn('Form POST failed:', err));

        // 3) immediately reset the form
        this.reset();

        // 4) show success popup
        showPopup('Thank you for reaching out. I’ll get back to you soon.');
    });

    function showPopup(message, isError = false) {
        popup.textContent = message;
        popup.classList.toggle('error', isError);
        popup.classList.toggle('success', !isError);

        // force the popup visible, even against any CSS rule
        popup.style.setProperty('display', 'block', 'important');

        setTimeout(() => {
            popup.style.setProperty('display', 'none', 'important');
        }, 3000);
    }
});
