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

// Static temperature and wind speed values (Metric)
const temperature = 10; // °C
const windSpeed = 5; // km/h

/**
 * Calculate wind chill factor based on temperature (°C) and wind speed (km/h)
 * Formula: Wind Chill (°C) = 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
 * where T is the air temperature in °C and V is wind speed in km/h.
 */
function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1); // Return result rounded to one decimal place
}

// Check if conditions are met for viable wind chill calculation
let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(temperature, windSpeed) + " °C";
}

// Dynamically update the webpage weather content
document.getElementById("temp").textContent = `${temperature} °C`;
document.getElementById("wind").textContent = `${windSpeed} km/h`;
document.getElementById("windChill").textContent = windChill;

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