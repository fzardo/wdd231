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

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Close modal on outside click
window.onclick = e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
}