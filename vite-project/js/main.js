import './css/style.css'; // Assuming you have TailwindCSS for styling

const URL = "https://amiiboapi.com/api/amiibo";

async function getData(URL) {
    try {
        // Fetch data from the API
        const response = await fetch(URL);
        
        // Log the response status and the actual response data for debugging
        console.log('Response Status:', response.status);
        
        // Convert the response to JSON
        const data = await response.json();

        // Log the data to check its structure
        console.log('API Data:', data);

        // Check the structure of the data before accessing it
        if (data && data.amiibo && Array.isArray(data.amiibo)) {
            // Get the container where the cards will go
            const cardContainer = document.getElementById('card-container');
            
            // Loop through each amiibo in the data and create a card for each one
            data.amiibo.forEach(amiibo => {
                // Create the HTML content for the card
                const cardHTML = `
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <img class="w-full" src="${amiibo.image}" alt="${amiibo.name}">
                        <div class="px-6 py-4">
                            <h2 class="font-bold text-xl">${amiibo.name}</h2>
                            <p class="text-gray-700 text-base">
                                ${amiibo.series || "No series available"}
                            </p>
                        </div>
                    </div>
                `;

                // Insert the card HTML into the container using insertAdjacentHTML
                cardContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        } else {
            // If data is not as expected, display an error message
            document.getElementById("api-response").textContent = "Unexpected data format.";
        }
    } catch (error) {
        // Log any errors to the console and show a generic error message
        console.log('Error:', error);
        document.getElementById("api-response").textContent = "Failed to load data.";
    }
}

// Call the function to fetch the data
getData(URL);
