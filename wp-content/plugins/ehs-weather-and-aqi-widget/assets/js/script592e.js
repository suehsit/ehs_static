let ehsWeatherAqi = {

        // Retrieve the data to display on this page
        retrieveWeatherAQI: function() {
            let that = this,
                updateDate = moment().format('H:mm A @ MMM D, YYYY'),
                sent100 = false,
                sent150 = false,
                sent200 = false;

            $('.weather-widget-last-updated').text(updateDate);

            $.ajax({
                type: "GET",
                url: EhsWeatherAqiWidget.path + 'getWeatherAQI.php',
                dataType: "json",
                cache: false,
                success: function(json) {
                    //console.log(json); // @todo
                    that.processWeatherAQI(json);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log(xhr.status);
                    console.log(xhr.responseText);
                    console.log(thrownError);
                }
            });
        },

        // Process and display data
        processWeatherAQI: function(json) {
            $('.weather-widget-f').text(json.temp_f);
            $('.weather-widget-c').text(json.temp_c);
            $('.weather-widget-aqi').text(json.aqi);
        }
    };


// Get this party started
(function() {
    ehsWeatherAqi.retrieveWeatherAQI();
})();