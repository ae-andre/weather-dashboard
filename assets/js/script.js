var userInput = $("#city-search");
var submitSearch = $("#submit-search");
var weatherSection = $(".current-weather");
var fiveSection = $("#weather-card");
var fiveSectionEl1 = $(".weather-card1");
var fiveSectionEl2 = $(".weather-card2");
var fiveSectionEl3 = $(".weather-card3");
var fiveSectionEl4 = $(".weather-card4");
var fiveSectionEl5 = $(".weather-card5");
var searchSection = $(".search-history");

var pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];

submitSearch.on("click", function () {
  // clear welcome message
  weatherSection.empty();
  // take user input and render current weather
  var city = userInput.val();
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d25c521dda0430b5616db00d103b5a4&units=metric `,
    success: function (result) {
      var cityNameEl = $("<h1>");
      var iconEl = $("<img>");
      var tempEl = $("<p>");
      var humidEl = $("<p>");
      var windEl = $("<p>");
      cityNameEl.text(result.name);
      iconEl.attr(
        "src",
        `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
      );
      iconEl.attr("alt", `icon of ${result.weather[0].description}`);
      tempEl.text("Temperature: " + result.main.temp + "°C");
      humidEl.text("Humidity: " + result.main.humidity + " %");
      windEl.text("Wind Speed: " + result.wind.speed + "KPH");
      weatherSection.append(cityNameEl, iconEl, tempEl, humidEl, windEl);

      // save search to local storage
      pastSearches.push(city);
      localStorage.setItem("pastSearches", JSON.stringify(pastSearches));

      // render search history buttons
      renderPastSearches();
    },
  });
  // take user input and render 5 day forecast
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4d25c521dda0430b5616db00d103b5a4&units=metric `,
    success: function (result) {
      var selectedData = [
        result.list[4],
        result.list[12],
        result.list[20],
        result.list[28],
        result.list[36],
      ];
      for (i = 0; i < selectedData.length; i++) {
        var dateEl = $("<p>");
        var iconEl = $("<img>");
        var tempEl = $("<p>");
        var windEl = $("<p>");
        var humidEl = $("<p>");
        dateEl.text(
          new Date(selectedData[i].dt * 1000).toLocaleString("en-US", {
            weekday: "long",
          })
        );
        iconEl.attr(
          "src",
          `https://openweathermap.org/img/wn/${selectedData[i].weather[0].icon}@2x.png`
        );
        iconEl.attr("alt", `icon of ${selectedData[i].weather[0].description}`);
        tempEl.text("Temp: " + selectedData[i].main.temp + " °C");
        windEl.text("Wind: " + selectedData[i].main.temp + " KPH");
        humidEl.text("Humidity: " + selectedData[i].main.temp + " %");
        $(`.weather-card${i + 1}`).append(
          dateEl,
          iconEl,
          tempEl,
          windEl,
          humidEl
        );
      }
    },
  });
});

function renderPastSearches() {
  searchSection.empty();
  for (var i = 0; i < pastSearches.length; i++) {
    var pastSearchEl = $("<button>");
    pastSearchEl.text(pastSearches[i]);
    pastSearchEl.addClass("past-search-button");
    searchSection.append(pastSearchEl);
  }
}

// clear the current weather
function clearCurrentWeather() {
  weatherSection.empty();
  for (var i = 0; i < 5; i++) {
    $(`.weather-card${i + 1}`).empty();
  }
}

// show past searches on page load
renderPastSearches();

// add click event to past-search buttons
searchSection.on("click", ".past-search-button", function () {
  var pastCity = $(this).text();
  userInput.val(pastCity);
  submitSearch.trigger("click");
  clearCurrentWeather();
});
