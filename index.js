function fetchData(place) {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&aqi=no`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.error) {
        handleError(result.error.message)
      } else {
        buildHeader(result);
        buildTable(result.current);
        showElement("table");
        showElement("data-container");
      }
      hideElement("loading");
    })
    .catch((error) => {
      console.log("caught error", error);
      hideElement("loading");
      handleError(error.message);
    })
}

// fetchData()

function buildHeader (data) {
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = data.location.name + ", " + data.location.country;
  const condition = document.getElementById("condition");
  condition.innerHTML = data.current.condition.text;
  const icon = document.querySelector("img");
  icon.src = data.current.condition.icon;
  icon.alt = data.current.condition.text;
}

function buildHeader (data) {
  const cityName = document.getElementById("city-name");
  cityName.innerHTML = data.location.name + ", " + data.location.country;
  const condition = document.getElementById("condition");
  condition.innerHTML = data.current.condition.text;
  const icon = document.querySelector("img");
  icon.src = data.current.condition.icon;
}

function buildTable(weather) {
  // create and append all table elements
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");
  const tdTemp = document.createElement("td");
  const tdFL = document.createElement("td");
  const tdHumid = document.createElement("td");
  const tdUV = document.createElement("td");
  const tdWind = document.createElement("td");
  tbody.appendChild(tr);
  tr.append(tdTemp, tdFL, tdHumid, tdUV, tdWind)

  //assign data to each relevant cell
  tdTemp.innerHTML = weather.temp_c + "°C";
  tdFL.innerHTML = weather.feelslike_c + "°C";
  tdHumid.innerHTML = weather.humidity;
  tdUV.innerHTML = weather.uv;
  tdWind.innerHTML = weather.wind_kph + " kph";
}

function addEvent () {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showElement("loading");
    hideElement("table");
    hideElement("data-container");
    hideElement("error-div");
    const input = document.getElementById("input");
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    fetchData(input.value);
  })
}

addEvent()

function hideElement (id) {
  const element = document.getElementById(id);
  element.classList.add("hide");
}

function showElement (id) {
  const element = document.getElementById(id);
  element.classList.remove("hide");
}

function handleError (message) {
  showElement("error-div");
  const msg = document.getElementById("message");
  msg.innerText = message
}

function getDefaultData () {
  const permission = navigator.geolocation;
  if (permission) {
    permission.getCurrentPosition((pos) => {
      console.log(pos);
      const { latitude, longitude } = pos.coords;
      const string = `${latitude},${longitude}`;
      fetchData(string);
    })
  }
}

getDefaultData();