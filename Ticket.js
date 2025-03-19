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

    const apiUrl = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStationCode}&toStationCode=${toStationCode}&dateOfJourney=${date}`;
    const options = {
        method: 'GET',
        headers: {
    'x-rapidapi-key': 'd7602e564cmsh7955183ff227343p12a231jsn544f4f770a80',
            'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
    };

    console.log('Fetching data from API...');
    try {
        const response = await fetch(apiUrl, options);
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
            <button class="book-Ticket-btn" data-train-name="${train.train_name}" data-train-number="${train.train_number}" data-from-station="${train.from_station_name}" data-to-station="${train.to_station_name}" data-date="${train.train_date}" data-class-type="${train.class_type}">Book Ticket</button>
        `;
        container.appendChild(card);
    });

    document.getElementById('train-results').classList.remove('hiddentable');
}

function handleBooking(event) {
    if (event.target && event.target.classList.contains('book-Ticket-btn')) {
        const date = event.target.getAttribute('data-date');
        const fromStationName = document.getElementById('From').value.trim();
        const toStationName = document.getElementById('To').value.trim();

        if (fromStationName && toStationName && date) {
            const bookingUrl = `https://www.confirmtkt.com/rbooking-d/trains/from/${encodeURIComponent(fromStationName)}/to/${encodeURIComponent(toStationName)}/${date}`;
            console.log('Redirecting to:', bookingUrl);
            window.location.href = bookingUrl;
        } else {
            alert('Please fill in all fields.');
        }
    }
}

document.addEventListener('click', handleBooking);
document.addEventListener('touchstart', handleBooking);

document.getElementById('SearchtrainSubmitBtn').addEventListener('click', searchTrains);