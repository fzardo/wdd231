const DISCOVER_URL = "https://fzardo.github.io/wdd231/chamber/scripts/discover.json";
const discoverGrid = document.getElementById("discoverCards");

// Visit message logic (same as before)
document.addEventListener('DOMContentLoaded', () => {
    let visitMessage = document.querySelector('#visit-message');
    let lastVisit = localStorage.getItem('lastVisit');
    let currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        let daysSince = Math.floor((currentDate - lastVisit) / 86400000);

        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentDate.toString());

    // Load discovers after handling visit message
    getDiscoverData();
});

async function getDiscoverData() {
    try {
        let response = await fetch(DISCOVER_URL);
        let data = await response.json();
        displayDiscoverCards(data);
    } catch (error) {
        console.error("Error loading discovers:", error);
        discoverGrid.innerHTML = "<p>Error loading discovers. Please try again later.</p>";
    }
}

function displayDiscoverCards(data) {
    discoverGrid.innerHTML = ""; // Clear loading state

    data.discovers.forEach(discover => {
        let card = document.createElement("article");
        card.classList.add("discover-card");

        let discoverName = document.createElement('h2');
        let figCaption = document.createElement("figcaption");
        let image = document.createElement('img');

        discoverName.textContent = discover.name;

        image.setAttribute('src', discover.image);
        image.setAttribute('alt', `${discover.name}`);
        figCaption.innerHTML = `
                Address: ${discover.address}<br>
                Description: ${discover.description}<br>
            `;
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');

        card.appendChild(discoverName);
        info.appendChild(figCaption);
        info.appendChild(image);
        card.appendChild(info);

        discoverGrid.appendChild(card);
    });
}