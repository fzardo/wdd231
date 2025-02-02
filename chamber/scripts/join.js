const now = new Date().getFullYear();
document.getElementById('timestamp').textContent = now;

// Modal Handling
document.querySelectorAll('.info-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const modal = document.querySelector(link.getAttribute('href'));
        modal.style.display = 'block';
    });
});