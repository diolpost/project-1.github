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
  let h3 = document.querySelector("h3");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  h3.innerHTML = `${day}, ${hours}:${minutes}`;
}
currentTime();

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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let curTemp = document.querySelector("#currentTemperature");
  curTemp.innerHTML = `${temp}°C`;
  let humidity = (document.querySelector("#Humidity").innerHTML =
    response.data.main.humidity);
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#Precipitation").innerHTML =
    response.data.main.precipitation;
}
