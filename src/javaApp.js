function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   
            <div class="col-sm-2"> 
              <div class="card-body">
                  <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                 
                  <img src="${changeIcon(forecastDay.weather[0].description)}"
                  alt=""
                  width="35"
                 />
                  <p class="card-text">
                    <span class="max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>  <span class="min">${Math.round(
          forecastDay.temp.min
        )}°</span>
                  </p>  
                  </div>
                  
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeAnimation(description) {
  let video = document.querySelector("#animation");
  if (
    description === "light intensity shower rain" ||
    description === "rain" ||
    description === "light rain" ||
    description === "moderate rain" ||
    description === "drizzle"
  ) {
    video.setAttribute("src", `videos/rainyWeather.mp4`);
  } else if (
    description === "broken clouds" ||
    description === "scattered clouds" ||
    description === "few clouds" ||
    description === "overcast clouds"
  ) {
    video.setAttribute("src", `videos/cloudsWeather.mp4`);
  } else if (description === "sunny") {
    video.setAttribute("src", `videos/sunnyWeather.mp4`);
  } else if (description === "snow") {
    video.setAttribute("src", `videos/snowWeather.mp4`);
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
  getForecast(response.data.coord);
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

function changeIcon(description) {
  let iconPath = "";
  if (
    description === "light intensity shower rain" ||
    description === "rain" ||
    description === "light rain" ||
    description === "moderate rain" ||
    description === "drizzle"
  ) {
    iconPath = `images/rainy.png`;
  } else if (
    description === "broken clouds" ||
    description === "scattered clouds" ||
    description === "few clouds" ||
    description === "overcast clouds"
  ) {
    iconPath = `images/cloudy.png`;
  } else if (description === "sunny") {
    iconPath = `images/sun2.png`;
  } else if (description === "snow") {
    iconPath = `images/snow.png`;
  } else {
    iconPath = `images/sun2.png`;
  }

  return iconPath;
}

search("Zürich");
