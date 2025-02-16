const artistsUrl = 'https://fzardo.github.io/wdd231/website-project/scripts/artists.json';
const artistCards = document.querySelector('#artists');
const artistNavContainer = document.querySelector(".nav-container");
const artistSubNavContainer = document.querySelector(".sub-nav-container");

async function getArtistData(randomize) {
    const response = await fetch(artistsUrl);
    const data = await response.json();
    const artistsToDisplay = randomize ? selectRandomArtists(data.songs) : data.songs;
    displayArtists(artistsToDisplay);
    createNavigation(data.songs);
}

function selectRandomArtists(artists) {
    const shuffled = [...artists].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 1); // 1 or 2 artists
}

function displayArtists(artists) {
    artistCards.innerHTML = '';
    artists.forEach(artist => {
        const card = document.createElement('div');
        card.classList.add('artist-card');

        const artisticName = document.createElement('h3');
        artisticName.textContent = artist.artisticName;

        const originalName = document.createElement('p');
        originalName.textContent = `Original Name: ${artist.originalName}`;

        const details = document.createElement('p');
        details.textContent = artist.details;

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('artist-links');
        artist.urls.forEach(url => {
            const link = document.createElement('a');
            link.href = url;
            link.textContent = new URL(url).hostname;
            link.target = "_blank";
            linksContainer.appendChild(link);
        });

        card.appendChild(artisticName);
        card.appendChild(originalName);
        card.appendChild(details);
        card.appendChild(linksContainer);
        artistCards.appendChild(card);
    });
}

function createNavigation(artists) {
    artistNavContainer.innerHTML = "";
    artistSubNavContainer.innerHTML = "";
    
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.addEventListener("click", () => displayArtists(artists));
    artistNavContainer.appendChild(allButton);

    const artisticNameButton = document.createElement("button");
    artisticNameButton.textContent = "Artistic Name";
    artisticNameButton.addEventListener("click", () => 
        createSubNavigation("Artistic Name", artists)
    );
    artistNavContainer.appendChild(artisticNameButton);
}

function createSubNavigation(category, artists) {
    artistSubNavContainer.innerHTML = "";
    const uniqueNames = [...new Set(artists.map(artist => artist.artisticName))];
    
    uniqueNames.forEach(name => {
        const button = document.createElement("button");
        button.textContent = name;
        button.addEventListener("click", () => filterArtists(category, name, artists));
        artistSubNavContainer.appendChild(button);
    });
}

function filterArtists(category, value, artists) {
    const filtered = artists.filter(artist => 
        category === "Artistic Name" ? artist.artisticName === value : true
    );
    displayArtists(filtered);
}

// Call getArtistData() based on page
if (document.body.id === 'index') {
    getArtistData(true);  // Randomly display 1-2 artists for index.html
} else {
    getArtistData(false);  // Display all artists for browse.html
}