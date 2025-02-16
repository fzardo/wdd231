const url = 'https://fzardo.github.io/wdd231/chamber/scripts/songs.json';
const cards = document.querySelector('#songs');

// Fetch the songs data
async function getSongData(randomize) {
    console.log(randomize);
    const response = await fetch(url);
    const data = await response.json();
    // If randomize is true, apply filtering and selection, otherwise show all songs
    const songsToDisplay = randomize ? selectRandomSong(data.songs) : data.songs;
    displaySongs(songsToDisplay);
}

// Function to randomly select 2-3 songs with gold or silver songships
const selectRandomSongs = (songs) => {
    // Filter for gold (level 3) and silver (level 2) songs
    const filteredSongs = songs.filter(member => member.songshipLevel === 2 || member.songshipLevel === 3);

    // Randomize the order of the filtered songs
    const shuffledSongs = filteredSongs.sort(() => 0.5 - Math.random());

    // Return a random subset of 2–3 songs
    return shuffledSongs.slice(0, Math.floor(Math.random() * 2) + 2);
};

// Function to display the member data
const displaySongs = (songs) => {
    cards.innerHTML = ''; // Clear existing content

    songs.forEach((member) => {
        let card = document.createElement('section');
        let info = document.createElement('div');

        let businessName = document.createElement('h3');
        let figCaption = document.createElement("figcaption");
        let image = document.createElement('img');

        businessName.textContent = member.businessName;

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `${member.businessName}`);
        figCaption.innerHTML = `
            Email: ${member.address}<br>
            Phone: ${member.phone}<br>
            URL: <a href="${member.url}" target="_blank">${member.url}</a>
        `;
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        card.appendChild(businessName);
        info.appendChild(figCaption);
        info.appendChild(image);
        card.appendChild(info);

        cards.appendChild(card);
    });
};

// Call getMemberData() with specific argument based on the page
if (document.body.id === 'index') {
    getMemberData(true);  // Randomly display 2-3 songs for index.html
} else {
    getMemberData(false);  // Display all songs for directory.html
}
