let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let lat = 0;
let lon = 0;

let getWeather = async() => {
    let cityValue = cityRef.value;
    if(cityValue.length == 0){
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
    }else {
        // for lon & lat 
        let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${key}`;
        let res = await fetch(geoUrl);
        let data = await res.json();
        if (data.length === 0) {
            result.innerHTML = `<h3 class="msg">City not found</h3>`
            return;
        }
        lat = data[0].lat;
        lon = data[0].lon;

        // for temprature 
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
   
        // for other details 
        let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

        cityRef.value = "";
        fetch(url)
        .then((res) => res.json() )
        .then(data => {
            fetch(url2).then((res2) => res2.json())
            .then(data2 => {
                result.innerHTML = `
                    <h2>${data2.name}</h2>
                    <h4 class=weather>${data2.weather[0].main}</h4>
                    <h4 class="desc">${data2.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data2.weather[0].icon}.png">
                    <h1>${data.current.temperature_2m} &#176;</h1>
                    <div class="temp-container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.daily.temperature_2m_min[0]}</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.daily.temperature_2m_max[0]}</h4>
                        </div>
                    </div>
                    `;
            })
        })   
    }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);