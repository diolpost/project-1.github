function currentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
   if (minutes < 10) {
    minutes = `0${minutes}`;
  } // 0,1,2, 12

  if (hours < 10) {
    hours = `0${hours}`;
  } //1, 2, 3, 4
  let days = 
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response){
let forecast = response.data.daily;
  
let forecastElement = document.querySelector("#forecast");


  let forecastHTML =`<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
   if (index < 6){
forecastHTML= forecastHTML+` 
  
   <div class="col-2" class="weather-forecast" id="forecast">
          <div class="weather-forecast-date">
            <strong>${formatDay(forecastDay.time)}</strong>
          </div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" alt=""
              width="42" />
          <div class="weather-forecast-temperatures">
            ${Math.round(forecastDay.temperature.maximum)}° </span>
              <span class="weather-forecast-temperature-min">
                ${Math.round(forecastDay.temperature.minimum)}° </span>
          </div>
      </div>`;}
     });
  forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "1bec10c5dae0co55a6f6caet0134d33c";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key=${apiKey}&units=metric`;
console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
 let tempEl= Math.round(response.data.temperature.current);
  let curTempEl = document.querySelector("#temperature");
  let cityEl=document.querySelector("#city");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl=document.querySelector("#date");
  let precipitationEl = document.querySelector("#precipitation");
  let iconEl= document.querySelector("#icon");


curTempEl.innerHTML=`${tempEl}°`;
cityEl.innerHTML=response.data.city;
  humidityEl.innerHTML=response.data.temperature.humidity;
  windEl.innerHTML=Math.round(response.data.wind.speed);
  precipitationEl.innerHTML=response.data.temperature.precipitation;
  dateEl.innerHTML=currentTime(response.data.time * 1000);
  iconEl.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  iconEl.setAttribute("alt", response.data.condition.description);
    
  getForecast(response.data.coordinates);
}

function search(city){
  let apiKey = "1bec10c5dae0co55a6f6caet0134d33c";
   let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
   search(cityInput.value);
  console.log(cityInput.value);
}

function showFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function showCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

search("New York");

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showCelsius);




