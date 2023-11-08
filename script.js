const cityName = document.querySelector(".cityName");
const searchBtn = document.querySelector(".searchBtn");
const city = document.querySelector(".city");
const wImg = document.querySelector(".wImg img");
const wValue = document.querySelector(".wValue");
const tValue = document.querySelector(".tValue");
const hValue = document.querySelector(".hValue");
const errorMsg = document.querySelector(".errorMsg");

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=420af5e57c181a3222fe7188ff533e6b";
const API_UNITS = "&units=metric";

const getWeather = () => {
    const city2 = cityName.value || "Rzeszów";
    const URL = API_URL + city2 + API_KEY + API_UNITS;

    axios.get(URL).then((res) => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const weather = res.data.weather[0].main;
        const weatherId = res.data.weather[0].id;

        errorMsg.textContent = "";
        cityName.value = "";

        if(weatherId >= 200 && 300 > weatherId) {
            wImg.setAttribute("src", "./img/thunderstorm.svg");
        } else if(weatherId >= 300 && 400 > weatherId) {
            wImg.setAttribute("src", "./img/rainyHeay.svg");
        } else if(weatherId >= 500 && 505 > weatherId) {
            wImg.setAttribute("src", "./img/rainy.svg");
        } else if(weatherId === 511) {
            wImg.setAttribute("src", "./img/snow.svg");
        } else if(weatherId >= 600 && 700 > weatherId) {
            wImg.setAttribute("src", "./img/snow.svg");
        } else if(weatherId >= 300 && 400 > weatherId) {
            wImg.setAttribute("src", "./img/mist.svg");
        } else if(weatherId === 800) {
            wImg.setAttribute("src", "./img/sunny.svg");
        } else if(weatherId >= 801 && 803 > weatherId) {
            wImg.setAttribute("src", "./img/partlyCloudyDay.svg");
        } else if(weatherId >= 803 && 900 > weatherId) {
            wImg.setAttribute("src", "./img/cloud.svg");
        }

        city.textContent = `${res.data.name}`;
        wValue.textContent = `${weather}`
        tValue.textContent = `${Math.round(temp)}°C`;
        hValue.textContent = `${hum}%`;
    }).catch(() => {
        errorMsg.textContent = "Podaj poprawną nazwę miasta/państwa!"
    });
}

const enterKeyCheck = (e) => {
    if(e.key === "Enter") {
        getWeather();
    }
}

getWeather();
cityName.addEventListener('keydown',enterKeyCheck);
searchBtn.addEventListener("click", getWeather);