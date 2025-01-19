// Dynamically set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Dynamically set the last modified date in the footer
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

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

// Dynamically update the webpage content
document.getElementById("temp").textContent = `${temperature} °C`;
document.getElementById("wind").textContent = `${windSpeed} km/h`;
document.getElementById("windChill").textContent = windChill;