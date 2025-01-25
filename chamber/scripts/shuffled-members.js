// Get members asynchronously
const url = 'https://fzardo.github.io/wdd231/chamber/scripts/members.json';

const cards = document.querySelector('#members');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    // Randomly display 2-3 members with gold or silver memberships
    displayMembers(selectRandomMembers(data.members));
}

const selectRandomMembers = (members) => {
    // Filter for gold (level 3) and silver (level 2) members
    const filteredMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // Randomize the order of the filtered members
    const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());

    // Return a random subset of 2–3 members
    return shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);
};

const displayMembers = (members) => {
    cards.innerHTML = ''; // Clear existing content

    members.forEach((member) => {
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

        if (member.membershipLevel === 1) {
            card.setAttribute('id', 'level1');
        } else if (member.membershipLevel === 2) {
            card.setAttribute('id', 'level2');
        } else {
            card.setAttribute('id', 'level3');
        }

        cards.appendChild(card);
    });
};

getMemberData();
