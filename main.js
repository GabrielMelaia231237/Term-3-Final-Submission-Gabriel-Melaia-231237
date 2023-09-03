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
            infoCard.show(); // This is to show the info card when hovering
        },
        error: function () {
            alert(`Failed to fetch weather data for ${city}.`);
        }
    });
}

$('.info-button').on('click', function () {
    const cruiseCard = $(this).closest('.cruise-card');
    const city = cruiseCard.find('h2').text(); //Using the H2 tag this looks for the name of the place. 
    const infoCard = cruiseCard.find('.info-card');
    fetchWeather(city, infoCard);
});

document.addEventListener("DOMContentLoaded", function () {
    const cruiseCards = document.querySelectorAll(".cruise-card");

    // Function to show or hide cruise cards based on filters
    function filterCards() {
        const durationFilter = document.getElementById("duration-filter").value;
        const destinationFilter = document.getElementById("destination-filter").value;
        const priceFilter = document.getElementById("price-filter").value;

        cruiseCards.forEach((card) => {
            const duration = card.getAttribute("data-duration");
            const destination = card.getAttribute("data-destination");
            const price = parseFloat(card.getAttribute("data-price"));

            const durationMatch = durationFilter === "all" || duration === durationFilter;
            const destinationMatch = destinationFilter === "all" || destination === destinationFilter;
            const priceMatch =
                priceFilter === "low-to-high" || priceFilter === "high-to-low" || priceFilter === "all" || priceFilter === "custom"
                    ? true
                    : (priceFilter === "low-to-high" && price >= 5000 && price <= 7500) ||
                      (priceFilter === "high-to-low" && price >= 7000 && price <= 8000);

            if (durationMatch && destinationMatch && priceMatch) {
                card.style.display = "block"; // Show the card
            } else {
                card.style.display = "none"; // Hide the card
            }
        });
    }

    // Event listeners for filter changes
    document.getElementById("duration-filter").addEventListener("change", filterCards);
    document.getElementById("destination-filter").addEventListener("change", filterCards);
    document.getElementById("price-filter").addEventListener("change", filterCards);

    // Initial filter
    filterCards();
});