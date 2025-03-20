document.getElementById('checkStatusBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    const trainNumber = document.getElementById('trainNumber').value.trim();
    const statusDetails = document.getElementById('status-details');
    const trainStatusResults = document.getElementById('train-status-results');

    if (!trainNumber) {
        alert('Please enter a valid train number.');
        return;
    }

    statusDetails.innerHTML = `
    <div class="container">
        <img src="Images/loader.gif" alt="Loading..." class="loader-gif">
    </div>
    <h2>Searching Trains...</h2>
`;
    trainStatusResults.classList.remove('hiddentable');

    try {
        // API Headers
        const myHeaders = new Headers();
        myHeaders.append("X-RapidAPI-Host", "irctc1.p.rapidapi.com");
        myHeaders.append("X-RapidAPI-Key", "fb8dbe5110mshcf13c98485917cfp100148jsnc69d7b39758b");
        myHeaders.append("x-apihub-key", "HzHu1xa0-X6ZFJeuJhFQnQ8Nsplj4IhNeuU4yfZe96qwbgKzMn");
        myHeaders.append("x-apihub-host", "IRCTC.allthingsdev.co");
        myHeaders.append("x-apihub-endpoint", "e147ad4e-3f74-4ddd-a06f-0d4c34d9127b");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // API URL with dynamic train number
        const apiUrl = `https://IRCTC.proxy-production.allthingsdev.co/api/v1/liveTrainStatus?trainNo=${trainNumber}&startDay=1`;

        // Fetch train status data
        const response = await fetch(apiUrl, requestOptions);
        console.log('API Response:', response);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Parsed Data:', data);

        // Check if the API returned an error
        if (data.status === false) {
            statusDetails.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }

        // Ensure `data.data` exists
        const trainData = data.data;
        if (!trainData) {
            console.error('Invalid API response: data.data is undefined');
            statusDetails.innerHTML = '<p>Error: Invalid API response.</p>';
            return;
        }

       // Extract relevant data from the API response
const currentStation = trainData.current_station_name || 'N/A';
const nextStation = trainData.next_stoppage_info?.next_stoppage || 'N/A';
const nextStationTime = trainData.next_stoppage_info?.next_stoppage_time_diff || 'N/A';
const delay = trainData.delay || 'N/A';
const status = trainData.status || 'N/A';
const statusAsOf = trainData.status_as_of || 'N/A';
const trainName = trainData.train_name || 'N/A';
const sourceStation = trainData.source_stn_name || 'N/A';
const destinationStation = trainData.dest_stn_name || 'N/A';
const distanceCovered = trainData.distance_from_source || 'N/A';
const totalDistance = trainData.total_distance || 'N/A';
const avgSpeed = trainData.avg_speed || 'N/A';
const pantryAvailable = trainData.pantry_available ? "Yes" : "No";

// Extract and format current location info
const locationInfo = trainData.current_location_info || [];
let locationDetails = '';

if (locationInfo.length > 0) {
    locationDetails = '<h3>Current Location Details:</h3>';
    locationInfo.forEach((info, index) => {
        locationDetails += `
            <div class="location-info">
                <p><strong>${info.label}:</strong> ${info.message} <strong>${info.hint}</strong></p>
            </div>
        `;
    });
}

// Display train status information
statusDetails.innerHTML = `
    <h2>${trainName} (${trainNumber})</h2>
    <p><strong>Source:</strong> ${sourceStation}</p>
    <p><strong>Destination:</strong> ${destinationStation}</p>
    <p><strong>Current Location:</strong> ${currentStation}</p>
    <p><strong>Next Station:</strong> ${nextStation} (${nextStationTime})</p>
    <p><strong>Status:</strong> ${status} (${statusAsOf})</p>
    <p><strong>Delay:</strong> ${delay} minutes</p>
    <p><strong>Distance Covered:</strong> ${distanceCovered} km / ${totalDistance} km</p>
    <p><strong>Average Speed:</strong> ${avgSpeed} km/h</p>
    <p><strong>Pantry Available:</strong> ${pantryAvailable}</p>
    <br><hr>
    ${locationDetails}
`;

        // console.log('Updated innerHTML:', statusDetails.innerHTML);
    } catch (error) {
        console.error('Error fetching train status:', error);
        statusDetails.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
    }
});