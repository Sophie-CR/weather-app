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
  let searchLocationTemp = document.querySelector("#temp");
  searchLocationTemp.innerHTML = Math.round(response.data.main.temp);
  let searchLocationDescription = document.querySelector("#description");
  searchLocationDescription.innerHTML = response.data.weather[0].description;
  let searchLocationWind = Math.round(response.data.wind.speed);
  document.querySelector("#current-wind").innerHTML = searchLocationWind;
  let searchLocationHumidity = Math.round(response.data.main.humidity);
  document.querySelector("#current-humidity").innerHTML =
    searchLocationHumidity;
  let searchLocationTempHigh = Math.round(response.data.main.temp_max);
  document.querySelector("#current-high").innerHTML = searchLocationTempHigh;
  let searchLocationTempLow = Math.round(response.data.main.temp_min);
  document.querySelector("#current-low").innerHTML = searchLocationTempLow;
}
function searchWeather(form) {
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

//Default
function defaultWeather() {
  let apiWeatherSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`;
  axios.get(`${apiWeatherSearchUrl}&appid=${apiKey}`).then(getWeatherSearch);
}

window.onload = defaultWeather;

// Convert Temperature
function convertFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temp");
  farenheit.innerHTML = 63;
}
let replaceFarenheit = document.querySelector("#farenheit");
replaceFarenheit.addEventListener("click", convertFarenheit);

function convertCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temp");
  celsius.innerHTML = 17;
}
let replaceCelsius = document.querySelector("#celsius");
replaceCelsius.addEventListener("click", convertCelsius);
