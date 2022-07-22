let weather = {
    "apiKey": "02653db3e074d8aebb818201be66772d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("Kein Wetter gefunden.");
              throw new Error("Kein Wetter gefunden.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = "Wetter in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "Feuchtigkeit:  " + humidity + " %";
        document.querySelector(".wind").innerText = "Windgeschwindigkeit:  " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document
    .querySelector(".search button")
    .addEventListener("click", function() {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Berlin");