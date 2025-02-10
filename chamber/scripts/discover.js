const DISCOVER_URL = "https://fzardo.github.io/wdd231/chamber/data/discover.json";
const discoverGrid = document.getElementById("discoverCards");

async function getDiscoverData() {
    try {
        const response = await fetch(DISCOVER_URL);
        const data = await response.json();
        displayDiscoverCards(data.attractions);
    } catch (error) {
        console.error("Error loading attractions:", error);
        discoverGrid.innerHTML = "<p>Error loading attractions. Please try again later.</p>";
    }
}

function displayDiscoverCards(attractions) {
    discoverGrid.innerHTML = ""; // Clear loading state
    
    attractions.forEach(attraction => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="images/${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        
        discoverGrid.appendChild(card);
    });
}

// Visit message logic (same as before)
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
    
    // Load attractions after handling visit message
    getDiscoverData();
});