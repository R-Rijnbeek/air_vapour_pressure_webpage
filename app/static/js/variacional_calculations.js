window.addEventListener('load', function() {

    var temperature_slider = document.getElementById("temperature");
    var temperature_change_slider = document.getElementById("temperature_change");
    var relative_humidity_slider = document.getElementById("relative_humidity");
    var relative_humidity_change_slider = document.getElementById("relative_humidity_change");

    sliderChanger(0.88)

    AddEventListenerOnSlider(temperature_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(temperature_change_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(relative_humidity_slider, AirPropertiesChangeCalculation)
    AddEventListenerOnSlider(relative_humidity_change_slider, AirPropertiesChangeCalculation)

    AirPropertiesChangeCalculation()

})

function AirPropertiesChangeCalculation(){
    let temp = $('#temperature').val()
    let delta_temp = $('#temperature_change').val() 
    let rh = $('#relative_humidity').val();
    let delta_rh = $('#relative_humidity_change').val()
    $.ajax(
        {
        url:"/post_variacional_request",
        type:"POST",
        data: {
            "temp": temp,
            "delta_temp": delta_temp,
            "rh": rh,
            "delta_rh": delta_rh
        },
        success: function(response){
            console.log("INFO: Succesfull calculation" + JSON.stringify(response))
            refrehTable(response)
        },
        error: function(error){
            console.log("ERROR: Unespected error => " + error.status)
        },
    });
}
