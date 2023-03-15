const API_KEY = "5a1d9d620b2432b2bfb80d3816169b84";
const API_URL = "https://api.openweathermap.org/data/2.5/";

// DOM elements
const cityEl = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const humidEl = document.getElementById("humid");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 5-day forecast cards
const cards = document.querySelectorAll(".fiveDay .card");

// Get the weather data for the current location
navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Get the current weather data
  fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Update the DOM elements with the current weather data
      cityEl.textContent = data.name;
      dateEl.textContent = `${days[new Date().getDay()]} ${new Date().toLocaleTimeString()}`;
      tempEl.textContent = data.main.temp;
      humidEl.textContent = data.main.humidity;
      windEl.textContent = data.wind.speed;
      iconEl.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
    .catch((error) => console.log(error));

  // Get the 5-day forecast data
  fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // Update the 5-day forecast cards with the forecast data
      let dayIndex = 0;
      for (let i = 0; i < data.list.length; i += 8) {
        const card = cards[dayIndex++];
        const forecast = data.list[i];

        card.querySelector(".card-day").textContent = days[new Date(forecast.dt_txt).getDay()];
        card.querySelector(".fiveDay-img").src = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        card.querySelector(".fiveDay-temp0").textContent = forecast.main.temp;
        card.querySelector(".fiveDay-humid0").textContent = forecast.main.humidity;
        card.querySelector(".fiveDay-wind0").textContent = forecast.wind.speed;
      }
    })
    .catch((error) => console.log(error));
});
