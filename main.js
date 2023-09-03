function fetchWeather(city, infoCard) {
    const apiKey = '2a2b801f81636086af712b4a9bef16a7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (data) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;

            infoCard.html(`
                <p>Destination: ${city}</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
            `);
            infoCard.show(); // Displays the weather
        },
        error: function () {
            alert(`Failed to fetch weather data for ${city}.`);
        }
    });
}

$('.info-button').click(function () {
    const destination = $(this).closest('.cruise-card').data('destination');
    const infoCard = $(this).siblings('.info-card');

    // Checks if weather is already fetched
    if (infoCard.html() === '') {
        fetchWeather(destination, infoCard);
    } else {
        infoCard.toggle(); // Meant to toggle on and off but doesnt work 
    }
});

$('.info-button').on('click', function () {
    const cruiseCard = $(this).closest('.cruise-card');
    const city = cruiseCard.find('h2').text(); //Using the H2 tag this looks for the name of the place. 
    const infoCard = cruiseCard.find('.info-card');
    fetchWeather(city, infoCard);
});

document.getElementById('destinationFilter').addEventListener('change', function () {
    const filterValue = this.value;
    const cruiseCards = document.querySelectorAll('.cruise-card');

    cruiseCards.forEach(function (card) {
        card.style.display = 'inline-block';

        if (filterValue === 'short' && card.getAttribute('data-duration') !== 'short') {
            card.style.display = 'none';
        } else if (filterValue === 'long' && card.getAttribute('data-duration') !== 'long') {
            card.style.display = 'none';
        } else if (filterValue === 'single' && card.getAttribute('data-duration') !== 'single') {
            card.style.display = 'none';
        } else if (filterValue === 'multi' && card.getAttribute('data-duration') !== 'multi') {
            card.style.display = 'none';
        } else if (filterValue === 'round' && card.getAttribute('data-duration') !== 'round') {
            card.style.display = 'none';
        } else if (filterValue === 'cheap' && parseFloat(card.getAttribute('data-price')) > 500) {
            card.style.display = 'none';
        }
    });
});

