import '../css/style.css';

const URL = "https://amiiboapi.com/api/amiibo";
let allAmiibos = [];

// Fetch the data once when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getData(URL);
});

// Add event listener to search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const filteredAmiibos = filterAmiibos(searchQuery); // Filter Amiibos based on the search query
    renderCards(filteredAmiibos); // Re-render the filtered cards
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('search-bar').value = ''; // Clear the search bar
    renderCards(allAmiibos); // Render all Amiibos (no filter applied)
});

// Fetch data from the API
async function getData(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        // Check if the data is in the expected format
        if (data && data.amiibo && Array.isArray(data.amiibo)) {
            allAmiibos = data.amiibo; // Store the full data
            renderCards(allAmiibos);   // Render the cards initially
        } else {
            document.getElementById("api-response").textContent = "Unexpected data format.";
        }
    } catch (error) {
        console.log('Error:', error);
        document.getElementById("api-response").textContent = "Failed to load data.";
    }
}

// Function to filter Amiibos based on the search query
function filterAmiibos(query) {
    return allAmiibos.filter(amiibo => {
        return amiibo.name.toLowerCase().includes(query) || 
               (amiibo.gameSeries && amiibo.gameSeries.toLowerCase().includes(query));
    });
}

// Function to render Amiibo cards to the DOM
function renderCards(amiibos) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear the previous cards

    // If no results are found, show a message
    if (amiibos.length === 0) {
        cardContainer.innerHTML = '<p>No Amiibos found.</p>';
        return;
    }

    // Render each Amiibo card
    amiibos.forEach(amiibo => {
        const cardHTML = `
        <div class="card">
            <img src="${amiibo.image}" alt="${amiibo.name}" class="card-img" />
            <div class="card-content">
                <h2>${amiibo.name}</h2>
                <p>${amiibo.gameSeries || "No series available"}</p>
                <r>NA Release: ${amiibo.release.na}</r><br>
                <r>JP Release: ${amiibo.release.jp}</r><br>
                <r>EU Release: ${amiibo.release.eu}</r><br>
                <r>AU Release: ${amiibo.release.au}</r><br>
            </div>
        </div>
        `;
        cardContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}
