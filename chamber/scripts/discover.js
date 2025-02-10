// Visit message logic
document.addEventListener('DOMContentLoaded', () => {
    const visitMessage = document.querySelector('#visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((currentDate - lastVisit) / 86400000);
        
        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate.toString());
});