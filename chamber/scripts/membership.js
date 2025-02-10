const url = "https://fzardo.github.io/wdd231/chamber/scripts/memberships.json";
const showHere = document.querySelector(".membership-cards");
const dialog = document.getElementById("membershipDialog");
const dialogTitle = dialog.querySelector("h2");
const dialogBenefitsList = dialog.querySelector("ul");
const closeButtons = document.querySelectorAll(".close-modal");

// Close modal when clicking close button
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        dialog.close();
    });
});

// Close modal when clicking outside of dialog
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

async function getMembershipData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayMemberships(data);
    } catch (error) {
        console.error("Error loading memberships:", error);
    }
}

function displayMemberships(data) {
    data.Memberships.forEach(membership => {
        const card = document.createElement("article");
        card.classList.add("membership-card");

        // Assign membership level IDs if needed
        if (membership.level.includes("Bronze")) {
            card.id = "level1";
        } else if (membership.level.includes("Silver")) {
            card.id = "level2";
        } else if (membership.level.includes("Gold")) {
            card.id = "level3";
        }

        let title = document.createElement("h3");
        title.textContent = membership.level;

        let fee = document.createElement("p");
        fee.textContent = membership.fee;

        let link = document.createElement("a");
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
    dialogTitle.textContent = `${membership.level} Benefits`;
    dialogBenefitsList.innerHTML = membership.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    dialog.showModal();
}

getMembershipData();