var stations = [
    "Mumbai Central BCT",
    "Chhatrapati Shivaji Terminus CSTM",
    "Lokmanya Tilak Terminus LTT",
    "Dadar DR",
    "New Delhi NDLS",
    "Delhi DLI",
    "Delhi Sarai Rohilla DEE",
    "Hazrat Nizamuddin NZM",
    "Howrah HWH",
    "Kolkata KOAA",
    "Chennai Central MAS",
    "Chennai Egmore MS",
    "Hyderabad HYB",
    "Bengaluru SBC",
    "Bengaluru Cantonment BNC",
    "Ahmedabad ADI",
    "Pune Junction PUNE",
    "Jaipur JP",
    "Lucknow LKO",
    "Surat ST",
    "Kanpur Central CNB",
    "Nagpur NGP",
    "Visakhapatnam VSKP",
    "Bhopal BPL",
    "Patna PNBE",
    "Ludhiana LDH",
    "Agra Cantt AGC"
];

function suggestStations(inputId) {
    var inputElement = document.getElementById(inputId);
    var inputValue = inputElement.value.toUpperCase();
    var suggestionsContainer = document.getElementById(inputId.toLowerCase() + "-suggestions");
    suggestionsContainer.innerHTML = "";

    if (!inputValue.trim()) return;

    var matches = stations.filter(function (station) {
        return station.toUpperCase().includes(inputValue);
    });

    matches.forEach(function (match) {
        var suggestionElement = document.createElement("div");
        suggestionElement.textContent = match;
        suggestionElement.addEventListener("click", function () {
            inputElement.value = match;
            suggestionsContainer.innerHTML = "";
        });
        suggestionsContainer.appendChild(suggestionElement);
    });

    if (matches.length > 0) {
        suggestionsContainer.style.display = "block";
    } else {
        suggestionsContainer.style.display = "none";
    }
}

document.getElementById('From').addEventListener('input', function () {
    suggestStations('From');
});

document.getElementById('To').addEventListener('input', function () {
    suggestStations('To');
});

function extractStationCode(station) {
    var parts = station.split(" ");
    if (parts.length < 2) {
        return null;
    }
    return parts[parts.length - 1];
}

async function searchTrains(event) {
    event.preventDefault();
    const container = document.getElementById('train-cards-container');
    container.innerHTML = `
        <div class="container">
            <img src="Images/loader.gif" alt="Loading..." class="loader-gif">
        </div>
        <h2>Searching Trains...</h2>
    `;
    document.getElementById('train-results').classList.remove('hiddentable');

    const fromStationName = document.getElementById('From').value.trim();
    const toStationName = document.getElementById('To').value.trim();
    const fromStationCode = extractStationCode(fromStationName);
    const toStationCode = extractStationCode(toStationName);

    const fromErrorElement = document.getElementById('from-error');
    const toErrorElement = document.getElementById('to-error');

    if (!fromStationCode) {
        fromErrorElement.textContent = "Invalid From Station. Please use the format 'Station Name CODE'.";
    } else {
        fromErrorElement.textContent = "";
    }

    if (!toStationCode) {
        toErrorElement.textContent = "Invalid To Station. Please use the format 'Station Name CODE'.";
    } else {
        toErrorElement.textContent = "";
    }

    if (!fromStationCode || !toStationCode) {
        return;
    }

    const date = document.getElementById('Date').value;

    console.log(`Searching trains from ${fromStationCode} to ${toStationCode} on ${date}`);

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

    const apiUrl = `https://IRCTC.proxy-production.allthingsdev.co/api/v3/trainBetweenStations?fromStationCode=${fromStationCode}&toStationCode=${toStationCode}&dateOfJourney=${date}`;

    console.log('Fetching data from API...');
    try {
        const response = await fetch(apiUrl, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data fetched from API:', data);

        // Check if the API returned an error
        if (data.status === false) {
            alert(`Error: ${data.message}`); // Show the error message as an alert
            return; // Stop further execution
        }

        // If no error, display the trains
        displayTrains(data.data);
    } catch (error) {
        console.error('Error fetching train data:', error);
        alert(`Error: ${error.message} Some Server issue PLEASE TRY AGAIN`); // Show the error message as an alert
    }
}

function displayTrains(trains) {
    // const trainStatusResults = document.getElementById('train-status-results');
    const container = document.getElementById('train-cards-container');

    container.innerHTML = '';
    if (!trains || trains.length === 0) {
        container.innerHTML = '<p>No trains found</p>';
        return;
    }

    trains.forEach(train => {
        const card = document.createElement('div');
        card.classList.add('train-card');
        card.innerHTML = `
            <h3>${train.train_name} (${train.train_number})</h3>
            <p><strong>From:</strong> ${train.from_station_name}</p>
            <p><strong>To:</strong> ${train.to_station_name}</p>
            <p><strong>Class:</strong> ${train.class_type}</p>
            <p><strong>Run Days:</strong> ${train.run_days}</p>
            <button class="check-seat-availability-btn" 
                    data-train-number="${train.train_number}" 
                    data-from-station="${train.from_station_name}" 
                    data-to-station="${train.to_station_name}" 
                    data-date="${train.train_date}" 
                    data-class-type="${train.class_type}">
                Check Seat Availability
            </button>
        `;
        container.appendChild(card);
    });

    // Add event listeners to "Check Seat Availability" buttons
    const buttons = document.querySelectorAll('.check-seat-availability-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const trainNumber = button.getAttribute('data-train-number');
            const fromStation = button.getAttribute('data-from-station');
            const toStation = button.getAttribute('data-to-station');
            const date = button.getAttribute('data-date');
            const classType = button.getAttribute('data-class-type');

            if (trainNumber && fromStation && toStation && date && classType) {
                const queryParams = new URLSearchParams({
                    trainNumber: trainNumber,
                    fromStation: fromStation,
                    toStation: toStation,
                    date: date,
                    class: classType
                });

                const seatAvailabilityUrl = `seat_avai.html?${queryParams.toString()}`;
                console.log('Redirecting to:', seatAvailabilityUrl);
                window.location.href = seatAvailabilityUrl;
            } else {
                alert('Invalid train details. Please try again.');
            }
        });
    });


}

function handleSeatAvailability(event) {
    if (event.target && event.target.classList.contains('check-seat-availability-btn')) {
        const trainNumber = event.target.getAttribute('data-train-number');
        const fromStation = event.target.getAttribute('data-from-station');
        const toStation = event.target.getAttribute('data-to-station');
        const date = event.target.getAttribute('data-date');
        const classType = event.target.getAttribute('data-class-type');

        if (trainNumber && fromStation && toStation && date && classType) {
            const queryParams = new URLSearchParams({
                trainNumber: trainNumber,
                fromStation: fromStation,
                toStation: toStation,
                date: date,
                class: classType
            });

            const seatAvailabilityUrl = `seat_avai.html?${queryParams.toString()}`;
            console.log('Redirecting to:', seatAvailabilityUrl);
            window.location.href = seatAvailabilityUrl;
        } else {
            alert('Invalid train details. Please try again.');
        }
    }
}

document.addEventListener('click', handleSeatAvailability);
document.addEventListener('touchstart', handleSeatAvailability);


document.getElementById('SearchtrainSubmitBtn').addEventListener('click', searchTrains);