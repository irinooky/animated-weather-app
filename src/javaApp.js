function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function changeAnimation(description) {
  let video = document.querySelector("#animation");
  if (description === "light intensity shower rain" && "rain") {
    video.setAttribute("src", `videos/rainyWeather.mp4`);
  } else if (
    description === "broken clouds" &&
    "scattered clouds" &&
    "few clouds"
  ) {
    video.setAttribute("src", `videos/cloudsWeather.mp4`);
  } else if (description === "sunny") {
    video.setAttribute("src", `videos/sunnyWeather.mp4`);
  } else {
    video.setAttribute("src", `videos/clearSkyWeather.mp4`);
  }
}

function displayWeatherCondition(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#currentCity");
  let statusElement = document.querySelector("#status");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  statusElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  changeAnimation(response.data.weather[0].description);
}

let units = "metric";

function search(city) {
  let apiKey = "c62ebe2801487103359e5c2553337660";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCityElement = document.querySelector("#input-city");
  search(inputCityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertToCelsius(event) {
  event.preventDefault();
  units = "metric";
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = Math.round(celsiusTemperature * 1.8) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

search("Zürich");
