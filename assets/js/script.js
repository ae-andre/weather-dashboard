var userInput = $("#city-search");
var submitSearch = $("#submit-search");
var weatherSection = $(".current-weather");
var fiveSection = $(".five-day");

submitSearch.on("click", function () {
  var city = userInput.val();
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=843fa40ad68a96668befb0da86d9b44b&units=metric `,
    // string template ` ${}
    // andre api key = 4d25c521dda0430b5616db00d103b5a4
    success: function (result) {
      var tempEl = $("<p>");
      var humidEl = $("<p>");
      var windEl = $("<p>");
      tempEl.text(result.main.temp + "°C");
      humidEl.text(result.main.humidity + " %");
      windEl.text(result.wind.speed + "KPH");
      weatherSection.append(tempEl, humidEl, windEl);
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
        fiveSection.append(dateEl, iconEl);
      }
    },
  });
});

// localstorage for history searches
