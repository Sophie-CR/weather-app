let now = new Date();
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

let h5 = document.querySelector("h5");
h5.innerHTML = `${hour}:${minute} ${day} ${now.getDate()} ${month} ${now.getFullYear()}`;

let apiKey = "10c6e46bee088157ebfe63ac8c22ea67";

//Search Results
function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let replace = document.querySelector("#current-city");
  replace.innerHTML = searchInput.value;
}
let replaceLocation = document.querySelector("#form");
replaceLocation.addEventListener("submit", searchLocation);

function getWeatherSearch(response) {
  console.log(response.data);
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
let replaceTemp = document.querySelector("#form");
replaceTemp.addEventListener("submit", searchWeather);

// GeoLocation Results
function userTemp(response) {
  let userCity = response.data.name;
  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = `${userCity}`;
  let locationTemp = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = locationTemp;
  let locationWind = Math.round(response.data.wind.speed);
  document.querySelector("#current-wind").innerHTML = locationWind;
  let locationHumidity = Math.round(response.data.main.humidity);
  document.querySelector("#current-humidity").innerHTML = locationHumidity;
  let locationTempHigh = Math.round(response.data.main.temp_max);
  document.querySelector("#current-high").innerHTML = locationTempHigh;
  let locationTempLow = Math.round(response.data.main.temp_min);
  document.querySelector("#current-low").innerHTML = locationTempLow;
}
function useMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiGeoWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiGeoWeatherUrl}&appid=${apiKey}`).then(userTemp);
}
function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(useMyLocation);
}
let currentLocationButton = document.querySelector("#use-location");
currentLocationButton.addEventListener("click", userLocation);

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

// Forecast
let dayOne = document.querySelector("#dayOne");
dayOne.innerHTML = days[now.getDay() + 1];

let dayTwo = document.querySelector("#dayTwo");
dayTwo.innerHTML = days[now.getDay() + 2];

let dayThree = document.querySelector("#dayThree");
dayThree.innerHTML = days[now.getDay() + 3];

let dayFour = document.querySelector("#dayFour");
dayFour.innerHTML = days[now.getDay() + 4];

let dayFive = document.querySelector("#dayFive");
dayFive.innerHTML = days[now.getDay() + 5];
