// Dynamically set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Dynamically set the last modified date in the footer
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

//Hamburger menu
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Get members asynchronously
const url = 'https://fzardo.github.io/wdd231/chamber/scripts/members.json';

const cards = document.querySelector('#members');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.members);
    displayMembers(data.members);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');

        let businessName = document.createElement('h3');
        let figCaption = document.createElement("figcaption");
        let image = document.createElement('img');

        businessName.textContent = member.businessName;

        image.setAttribute('src', member.image);
        image.setAttribute('alt', `${member.businessName}`)
        figCaption.innerHTML = `
            Email: ${member.address}<br>
            Phone: ${member.phone}<br>
            URL: ${member.url}
        `;
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', '440');

        card.appendChild(businessName);
        card.appendChild(figCaption);
        card.appendChild(image);

        cards.appendChild(card);
    });
}

getMemberData();