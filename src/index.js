function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  return `${hour}:${minute} ${day} ${now.getDate()} ${month} ${now.getFullYear()}`;
}

let apiKey = "10c6e46bee088157ebfe63ac8c22ea67";

function getWeatherSearch(response) {
  let searchLocationName = document.querySelector("#current-city");
  searchLocationName.innerHTML = response.data.name;
  let searchLocationCountry = document.querySelector("#current-country");
  searchLocationCountry.innerHTML = response.data.sys.country;
  let searchLocationTime = document.querySelector("#current-time-date");
  searchLocationTime.innerHTML = formatDate(response.data.dt * 1000);
  let searchLocationIcon = document.querySelector("#icon");
  searchLocationIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  searchLocationIcon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = Math.round(response.data.main.temp);
  let searchLocationTemp = document.querySelector("#temp");
  searchLocationTemp.innerHTML = celsiusTemp;
  let searchLocationDescription = document.querySelector("#description");
  searchLocationDescription.innerHTML = response.data.weather[0].description;
  let searchLocationWind = Math.round(response.data.wind.speed);
  document.querySelector("#current-wind").innerHTML = searchLocationWind;
  let searchLocationHumidity = Math.round(response.data.main.humidity);
  document.querySelector("#current-humidity").innerHTML =
    searchLocationHumidity;
  celsiusTempHigh = Math.round(response.data.main.temp_max);
  let searchLocationTempHigh = celsiusTempHigh;
  document.querySelector("#current-high").innerHTML = searchLocationTempHigh;
  celsiusTempLow = Math.round(response.data.main.temp_min);
  let searchLocationTempLow = celsiusTempLow;
  document.querySelector("#current-low").innerHTML = searchLocationTempLow;
  getForecast(response.data.coord);
}
function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  let apiWeatherSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiWeatherSearchUrl}&appid=${apiKey}`).then(getWeatherSearch);
}
let replaceWeather = document.querySelector("#form");
replaceWeather.addEventListener("submit", searchWeather);

function useMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiGeoWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiGeoWeatherUrl}&appid=${apiKey}`).then(getWeatherSearch);
}
function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(useMyLocation);
}
let currentLocationButton = document.querySelector("#use-location");
currentLocationButton.addEventListener("click", userLocation);

function defaultWeather() {
  let apiWeatherSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`;
  axios.get(`${apiWeatherSearchUrl}&appid=${apiKey}`).then(getWeatherSearch);
}
defaultWeather();

let celsiusTemp = null;
let celsiusTempHigh = null;
let celsiusTempLow = null;
let forecastCelsiusTempHigh = null;
let forecastCelsiusTempLow = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temp");
  fahrenheit.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  let currentHighF = document.querySelector("#current-high");
  currentHighF.innerHTML = Math.round((celsiusTempHigh * 9) / 5 + 32);
  let currentLowF = document.querySelector("#current-low");
  currentLowF.innerHTML = Math.round((celsiusTempLow * 9) / 5 + 32);
  let fahrenheitUnitHigh = document.querySelector("#current-unit-high");
  fahrenheitUnitHigh.innerHTML = "F";
  let fahrenheitUnitLow = document.querySelector("#current-unit-low");
  fahrenheitUnitLow.innerHTML = "F";
  replaceCelsius.classList.remove("hidden");
  replaceFahrenheit.classList.add("hidden");
}
let replaceFahrenheit = document.querySelector("#fahrenheit-link");
replaceFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp");
  celsius.innerHTML = celsiusTemp;
  let currentHighC = document.querySelector("#current-high");
  currentHighC.innerHTML = celsiusTempHigh;
  let currentLowC = document.querySelector("#current-low");
  currentLowC.innerHTML = celsiusTempLow;
  let celsiusUnitHigh = document.querySelector("#current-unit-high");
  celsiusUnitHigh.innerHTML = "C";
  let celsiusUnitLow = document.querySelector("#current-unit-low");
  celsiusUnitLow.innerHTML = "C";
  replaceCelsius.classList.add("hidden");
  replaceFahrenheit.classList.remove("hidden");
}
let replaceCelsius = document.querySelector("#celsius-link");
replaceCelsius.addEventListener("click", convertToCelsius);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col day">
            <label for="card-body" id="day-label" 
              >${formatDay(forecastDay.dt)}</label
            >
            <div class="card">
              <div class="card-body">
                <div id="day-icon"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
        /></div>
                <div><span id="forecast-high">${Math.round(
                  forecastDay.temp.max
                )}</span>°<span id="forecast-unit-high">C</span> / <span id="forecast-low">${Math.round(
          forecastDay.temp.min
        )}</span>°<span id="forecast-unit-low">C</span></div>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
