import '../css/style.css';

const URL = "https://amiiboapi.com/api/amiibo/";
let allAmiibos = [];


document.addEventListener('DOMContentLoaded', () => {
    getData(URL);
});


document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const filteredAmiibos = filterAmiibos(searchQuery); 
    renderCards(filteredAmiibos); 
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('search-bar').value = ''; 
    renderCards(allAmiibos); 
});


async function getData(URL) {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data && data.amiibo && Array.isArray(data.amiibo)) {
            allAmiibos = data.amiibo; 
            renderCards(allAmiibos);   
        } else {
            document.getElementById("api-response").textContent = "Unexpected data format.";
        }
    } catch (error) {
        console.log('Error:', error);
        document.getElementById("api-response").textContent = "Failed to load data.";
    }
}


function filterAmiibos(query) {
    return allAmiibos.filter(amiibo => {
        return amiibo.name.toLowerCase().includes(query) || 
               (amiibo.gameSeries && amiibo.gameSeries.toLowerCase().includes(query));
    });
}


function renderCards(amiibos) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; 

    
    if (amiibos.length === 0) {
        cardContainer.innerHTML = '<p>No Amiibos found.</p>';
        return;
    }


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
