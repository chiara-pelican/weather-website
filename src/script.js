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
let apiKey = "5293d8454b519c30f6f6331f38c85b4c";
let apiEndCode = `https://api.openweathermap.org/data/2.5/weather`;
let unit = "metric";
let limit = 1;

function returnWeather(weather) {
  let temp = Math.round(weather.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;
  console.log(weather.data);
  let city = weather.data.name;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;
  let hum = weather.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${hum} %`;
  let wind = weather.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  let pres = weather.data.main.pressure;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${pres} hPa`;
}
function changeCity(input) {
  input.preventDefault();
  let inputCity = document.querySelector("#form-input").value;

  let apiUrl = `${apiEndCode}?q=${inputCity}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(returnWeather);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrlLoc = `${apiEndCode}?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}&units=${unit}`;
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

//Change F and C
function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "18/25";
  fahrenheit.classList.remove("black");
  fahrenheit.classList.add("gray");
  celsius.classList.remove("gray");
  celsius.classList.add("black");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "64/77";
  celsius.classList.remove("black");
  celsius.classList.add("gray");
  fahrenheit.classList.remove("gray");
  fahrenheit.classList.add("black");
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
celsius.addEventListener("click", changeToCelsius);
fahrenheit.addEventListener("click", changeToFahrenheit);
*/
