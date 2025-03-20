// Function to fetch seat availability data from the API
async function fetchSeatAvailability(trainNumber, fromStation, toStation, date, classType) {
    const apiUrl = `https://irctc1.p.rapidapi.com/api/v3/checkSeatAvailability?trainNumber=${trainNumber}&fromStation=${fromStation}&toStation=${toStation}&date=${date}&class=${classType}`;

    const myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Host", "irctc1.p.rapidapi.com");
    myHeaders.append("X-RapidAPI-Key", "fb8dbe5110mshcf13c98485917cfp100148jsnc69d7b39758b");
    myHeaders.append("x-apihub-key", "HzHu1xa0-X6ZFJeuJhFQnQ8Nsplj4IhNeuU4yfZe96qwbgKzMn");
    myHeaders.append("x-apihub-host", "IRCTC.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "ba186358-897d-4f31-8c78-33941455b792");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching seat availability data:', error);
        throw error;
    }
}
const seatAvailabilityContainer = document.getElementById('seatAvailabilityResults');
// Function to display train details
function displayTrainDetails(trainNumber, fromStation, toStation, date, classType) {
    const trainDetailsContainer = document.getElementById('trainDetails');
    seatAvailabilityContainer.innerHTML = `
    <div class="container">
        <img src="Images/loader.gif" alt="Loading..." class="loader-gif">
    </div>
    <h2>Searching Trains...</h2>
`;
    trainDetailsContainer.innerHTML = `
        <h2>Train Details</h2>
        <p><strong>Train Number:</strong> ${trainNumber}</p>
        <p><strong>From Station:</strong> ${fromStation}</p>
        <p><strong>To Station:</strong> ${toStation}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Class:</strong> ${classType}</p>
    `;
}

// Function to display seat availability data
function displaySeatAvailability(data) {
   
    seatAvailabilityContainer.innerHTML = '';

    if (!data || data.status === false) {
        seatAvailabilityContainer.innerHTML = '<p>No seat availability data found.</p>';
        return;
    }

    const availability = data.availability;
    seatAvailabilityContainer.innerHTML = `
        <h2>Seat Availability</h2>
        <p><strong>Status:</strong> ${availability.status}</p>
        <p><strong>Available Seats:</strong> ${availability.availableSeats}</p>
        <p><strong>Waitlist:</strong> ${availability.waitlist}</p>
        <p><strong>Last Updated:</strong> ${availability.lastUpdated}</p>
    `;
}

// Main function to initialize the page
async function initializePage() {
    // Read query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const trainNumber = urlParams.get('trainNumber');
    const fromStation = urlParams.get('fromStation');
    const toStation = urlParams.get('toStation');
    const date = urlParams.get('date');
    const classType = urlParams.get('class');

    if (!trainNumber || !fromStation || !toStation || !date || !classType) {
        alert('Invalid train details. Please go back and try again.');
        return;
    }

    // Display train details
    displayTrainDetails(trainNumber, fromStation, toStation, date, classType);

    // Fetch and display seat availability data
    try {
        const seatAvailabilityData = await fetchSeatAvailability(trainNumber, fromStation, toStation, date, classType);
        displaySeatAvailability(seatAvailabilityData);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('seatAvailabilityResults').innerHTML = `<p>Error fetching seat availability data: ${error.message}</p>`;
    }
}

// Initialize the page when it loads
window.onload = initializePage;