function currentTime() {
  let now = new Date();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } // 0,1,2, 12
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } //1, 2, 3, 4
  let h3 = document.querySelector("currentDate");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  currentDate.innerHTML = `${day}, ${hours}:${minutes}`;
}
currentTime();



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let curTemp = document.querySelector("#currentTemperature");
   let humidity = (document.querySelector("#Humidity").innerHTML =
    response.data.main.humidity);
    let iconElement= document.querySelector("#current-weather-icon");

  curTemp.innerHTML=`${temp}°`;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#Precipitation").innerHTML =
    response.data.main.precipitation;
    
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
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showCelsius);



function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#currentCity");
  let searchCity = document.querySelector("#search-city-input");

  city.innerHTML = searchCity.value;
   let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML =`<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function(day){
forecastHTML= forecastHTML+` 
  
   <div class="col-2" class="weather-forecast" id="forecast">
          <div class="weather-forecast-date">
            <strong>${day}</strong>
          </div>
          <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 
              46°/
            </span>
            <span class="weather-forecast-temperature-min">
              23°
            </span>
          </div>
      </div>
      `;
     });
  forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML=forecastHTML;


};
displayForecast();