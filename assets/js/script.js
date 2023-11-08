var userInput = $("#city-search");
var submitSearch = $("#submit-search");
var weatherSection = $(".current-weather");
var fiveSectionEl1 = $(".weather-card1");
var fiveSectionEl2 = $(".weather-card2");
var fiveSectionEl3 = $(".weather-card3");
var fiveSectionEl4 = $(".weather-card4");
var fiveSectionEl5 = $(".weather-card5");

submitSearch.on("click", function () {
  var city = userInput.val();
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=843fa40ad68a96668befb0da86d9b44b&units=metric `,
    // string template ` ${}
    // andre api key = 4d25c521dda0430b5616db00d103b5a4
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
      tempEl.text("Temperature: " + result.main.temp + "°C");
      humidEl.text("Humidity: " + result.main.humidity + " %");
      windEl.text("Wind Speed: " + result.wind.speed + "KPH");
      weatherSection.append(cityNameEl, iconEl, tempEl, humidEl, windEl);
    },
  });
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=843fa40ad68a96668befb0da86d9b44b&units=metric `,
    // string template ` ${}
    // andre api key = 4d25c521dda0430b5616db00d103b5a4
    success: function (result) {
      var selectedData = [
        result.list[2],
        result.list[10],
        result.list[18],
        result.list[26],
        result.list[34],
      ];
      for (i = 0; i < selectedData.length; i++) {
        var dateEl = $("<p>");
        var iconEl = $("<img>");
        var tempEl = $("<p>");
        var windEl = $("<p>");
        var humidEl = $("<p>");
        dateEl.text(selectedData[i].dt);
        iconEl.attr(
          "src",
          `https://openweathermap.org/img/wn/${selectedData[i].weather[0].icon}@2x.png`
        );
        tempEl.text("Temp: " + selectedData[i].main.temp + " °C");
        windEl.text("Wind: " + selectedData[i].main.temp + " KPH");
        humidEl.text("Humidity: " + selectedData[i].main.temp + " %");
        fiveSectionEl1.append(
          dateEl[0],
          iconEl[0],
          tempEl[0],
          windEl[0],
          humidEl[0]
        );
        fiveSectionEl2.append(
          dateEl[1],
          iconEl[1],
          tempEl[1],
          windEl[1],
          humidEl[1]
        );
        fiveSectionEl3.append(
          dateEl[2],
          iconEl[2],
          tempEl[2],
          windEl[2],
          humidEl[2]
        );
        fiveSectionEl4.append(
          dateEl[3],
          iconEl[3],
          tempEl[3],
          windEl[3],
          humidEl[3]
        );
        fiveSectionEl5.append(
          dateEl[4],
          iconEl[4],
          tempEl[4],
          windEl[4],
          humidEl[4]
        );
      }
    },
  });
});

// localstorage for history searches
