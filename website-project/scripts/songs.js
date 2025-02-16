const url = 'https://fzardo.github.io/wdd231/website-project/scripts/songs.json';
const cards = document.querySelector('#songs');
const navContainer = document.querySelector(".nav-container");
const subNavContainer = document.querySelector(".sub-nav-container");

// Fetch the songs data
async function getSongData(randomize) {
    console.log(randomize);
    const response = await fetch(url);
    const data = await response.json();
    // If randomize is true, apply filtering and selection, otherwise show all songs
    const songsToDisplay = randomize ? selectRandomSong(data.songs) : data.songs;
    displaySongs(songsToDisplay);
    createNavigation(data.songs);
}

// Select random songs from the list
function selectRandomSong(songs) {
    const shuffled = songs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // Select 2 or 3 random songs
}

// Display songs dynamically using iframe
function displaySongs(songs) {
    cards.innerHTML = ''; // Clear existing content
    songs.forEach(song => {
        const card = document.createElement('div');
        card.classList.add('song-card');

        const title = document.createElement('h3');
        title.textContent = song.songName;

        const author = document.createElement('p');
        author.textContent = `${song.author}`;

        const iframe = document.createElement('iframe');
        iframe.src = song.url;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.loading = "lazy";
        iframe.allowFullscreen = true;

        card.appendChild(iframe);
        card.appendChild(title);
        card.appendChild(author);
        cards.appendChild(card);
    });
}

// Create navigation bar
function createNavigation(songs) {
    navContainer.innerHTML = "";
    subNavContainer.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.addEventListener("click", () => displaySongs(songs));
    navContainer.appendChild(allButton);

    ["Author", "Genre"].forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.addEventListener("click", () => createSubNavigation(category, songs));
        navContainer.appendChild(button);
    });
}

// Create sub-navigation for authors/genres
function createSubNavigation(category, songs) {
    subNavContainer.innerHTML = "";
    const uniqueValues = [...new Set(songs.flatMap(song => category === "Author" ? [song.author] : song.genre))];

    uniqueValues.forEach(value => {
        const button = document.createElement("button");
        button.textContent = value;
        button.addEventListener("click", () => filterSongs(category, value, songs));
        subNavContainer.appendChild(button);
    });
}

// Filter songs by selected author/genre
function filterSongs(category, value, songs) {
    const filteredSongs = songs.filter(song => category === "Author" ? song.author === value : song.genre.includes(value));
    displaySongs(filteredSongs);
}

// Call getSongData() with specific argument based on the page
if (document.body.id === 'index') {
    getSongData(true);  // Randomly display 2-3 songs for index.html
} else {
    getSongData(false);  // Display all songs for browse.html
}