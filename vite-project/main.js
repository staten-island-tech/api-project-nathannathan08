import './css/style.css'
//get data
//promises
//show data

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
            // If 'amiibo' is an array, display the names
            document.getElementById("api-response").innerHTML = data.amiibo
                .map(amiibo => `<h3>${amiibo.name}</h3>`)
                .join('');
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