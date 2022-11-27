/* write your code here
let city = prompt("Enter a city");
city = city.toLowerCase().trim();

if (weather[city]) {
  let tempCelsius = Math.round(weather[city].temp);
  let tempFar = Math.round(weather[city].temp / 1.8 + 32);
  alert(
    `It is currently ${tempCelsius}°C (${tempFar}°F) in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/
//Datum
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let month = months[currentDate.getMonth()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes > 9) {
    return `${day} ${date} ${month} ${hour}:${minutes}`;
  } else {
    return `${day} ${date} ${month} ${hour}:0${minutes}`;
  }
}

let currentDate = new Date();
let date = document.querySelector("#current-date");
let formattedDate = formatDate(currentDate);
date.innerHTML = formattedDate;

//Search bar realtime weather
let apiKey = "7ctdc077a2e3a3ado6fe94bb8949bd5b";
let apiEndCode = `https://api.shecodes.io/weather/v1/current?`;
let unit = "metric";
let limit = 1;

function returnWeather(weather) {
  console.log(weather);
  let iconToday = document.querySelector("#icon-today");
  iconToday.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weather.data.condition.icon}.png`
  );

  celsiusTemperature = weather.data.temperature.current;
  fahrenheitTemperature = celsiusTemperature * 1.8 + 32;

  let temp = Math.round(celsiusTemperature);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;
  console.log(weather.data.temperature);
  let city = weather.data.city;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;
  let hum = weather.data.temperature.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${hum} %`;
  let wind = weather.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  let description = weather.data.condition.description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  celsius.setAttribute("class", "black");
  fahrenheit.setAttribute("class", "gray");
}
function changeCity(input) {
  input.preventDefault();
  let inputCity = document.querySelector("#form-input").value;

  let apiUrl = `${apiEndCode}query=${inputCity}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(returnWeather);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrlLoc = `${apiEndCode}lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrlLoc).then(returnWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

getCurrentPosition();
let searchButton = document.querySelector("#search-addon");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("search", changeCity);
searchButton.addEventListener("click", changeCity);
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentPosition);
let celsiusTemperature = null;
let fahrenheitTemperature = null;

//Change temperature F and C
function changeToCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsius.setAttribute("class", "black");
  fahrenheit.setAttribute("class", "gray");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  celsius.setAttribute("class", "gray");
  fahrenheit.setAttribute("class", "black");
}

let temperature = document.querySelector("#temperature");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFahrenheit);

/*
  if (inputCity) {
    newCity.innerHTML = inputCity;
  } else {
    return;
  }
}


/*
//Week 4

function changeCity(input) {
  input.preventDefault();
  let inputCity = document.querySelector("#form-input").value;
  let newCity = document.querySelector("#city");
  if (inputCity) {
    newCity.innerHTML = inputCity;
  } else {
    return;
  }
}

let searchButton = document.querySelector("#search-addon");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("search", changeCity);
searchButton.addEventListener("click", changeCity);
*/
