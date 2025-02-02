const url = "https://fzardo.github.io/wdd231/chamber/scripts/members.json";
const showHere = document.querySelector(".membership-cards");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeModalButtons = document.querySelectorAll(".close-modal");

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        modal.style.display = "none";
    });
});

async function getMembershipData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMemberships(data);
    } catch (error) {
        console.error("Error loading memberships:", error);
    }
}

function displayMemberships(data) {
    data.Memberships.forEach(membership => {
        const card = document.createElement("article");
        card.classList.add("membership-card");

        const title = document.createElement("h3");
        title.textContent = membership.level;

        const fee = document.createElement("p");
        fee.textContent = membership.fee;

        const link = document.createElement("a");
        link.href = "#";
        link.classList.add("info-link");
        link.textContent = "View Benefits";
        link.addEventListener("click", () => showBenefits(membership));

        card.appendChild(title);
        card.appendChild(fee);
        card.appendChild(link);
        showHere.appendChild(card);
    });
}

function showBenefits(membership) {
    modalContent.innerHTML = `<h4>${membership.level} Benefits</h4><ul>${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>`;
    modal.style.display = "block";
}

getMembershipData();