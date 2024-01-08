window.addEventListener('load', function() {

    var temperature_slider = document.getElementById("temperature");
    var temperature_value = document.getElementById("temperature_value");

    var temperature_change_slider = document.getElementById("temperature_change");
    var temperature_change_value = document.getElementById("temperature_change_value");

    var relative_humidity_slider = document.getElementById("relative_humidity");
    var relative_humidity_value = document.getElementById("relative_humidity_value");

    var relative_humidity_change_slider = document.getElementById("relative_humidity_change");
    var relative_humidity_change_value = document.getElementById("relative_humidity_change_value");

    sliderChanger(temperature_slider,temperature_value)
    sliderChanger(temperature_change_slider,temperature_change_value)
    sliderChanger(relative_humidity_slider,relative_humidity_value)
    sliderChanger(relative_humidity_change_slider,relative_humidity_change_value)

    AddEventListenerOnSlider(temperature_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(temperature_change_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(relative_humidity_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(relative_humidity_change_slider, AirPropertiesChangeCalculation)

    AirPropertiesChangeCalculation()

})

function AirPropertiesChangeCalculation(){
    alert("hola")
    let temp = $('#temperature').val()
    let delta_temp = $('#temperature_change').val() 
    let hr = $('#relative_humidity').val();
    let delta_hr = $('#relative_humidity_change').val()
    $.ajax(
        {
        url:"/post_variacional_request",
        type:"POST",
        data: {
            "temp": temp,
            "delta_temp": delta_temp,
            "hr": hr,
            "delta_hr": delta_hr
        },
        success: function(response){
            console.log("INFO: Succesfull calculation" + JSON.stringify(response))
            //refrehTable(response)
            alert("buenas")
        },
        error: function(error){
            console.log("ERROR: Unespected error => " + error.status)
        },
    });
}


