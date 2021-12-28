if (navigator.cookieEnabled) {
    var section = $('.widgetw');
    if(section.width() < 863){
        $(".pictoBackdrop").hide();
    }
    if(section.width() < 760){
        $("#pic").hide();
        $(".summary").css("width", "90%");
    }
    if(section.width() < 360){
        $(".detailsw").css("margin-left", "15px");
    }
    $(document).ready(function(){
     var temp;
     if (getCookie("fail") != "true"){
      if (getCookie("city") === null || getCookie("temp") === null || getCookie("humidity") === null || getCookie("wind") === null) {
          $.getJSON('https://pro.ip-api.com/json?key=pAcPOWCUJWo5Gcp', function(d){
            var lat = d.lat;
            var lon = d.lon;
            var city = d.city;
            let freeCodeUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat +'&lon=' + lon;
            $.getJSON(freeCodeUrl, function(data) {
              temp = data.main.temp;
              var humidity = data.main.humidity;
              var wind = data.wind.speed;
              $('.summaryTex').html(city);
              $('.temperature').html(Math.round(temp)).append(" C&#176;");
              $('.prepnum').html(humidity);
              $('.windnum').html(wind);
              setCookie("city", city, 0.75);
              setCookie("temp", Math.round(temp), 0.75);
              setCookie("humidity", humidity, 0.75);
              setCookie("wind", wind, 0.75);
            });
          }).fail(function() {$(".nord").hide();$(".widgetw").hide();setCookie("fail", "true", 0.75);});
      }else{
        city = getCookie("city");
        temp = getCookie("temp") + " C&#176;";
        humidity = getCookie("humidity");
        wind = getCookie("wind");
        $('.summaryTex').html(city);
        $('.temperature').html(temp);
        $('.prepnum').html(humidity);
        $('.windnum').html(wind);
      }
      }else{
            $(".nord").hide();$(".widgetw").hide();
      }
    });
} else {
    $(".widgetw").hide();
}
