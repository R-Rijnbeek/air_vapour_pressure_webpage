
window.addEventListener('load', function() {

    var temperature_slider = document.getElementById("temperature");
    var relative_humidity_slider = document.getElementById("relative_humidity");

    sliderChanger(0.96)

    AddEventListenerOnSlider(temperature_slider, AirPropertiesCalculation)
    AddEventListenerOnSlider(relative_humidity_slider, AirPropertiesCalculation)

    AirPropertiesCalculation()

})

function AirPropertiesCalculation(){
    let temp = $('#temperature').val()
    let rh = $('#relative_humidity').val();
    $.ajax(
        {
        url:"/post_request",
        type:"POST",
        data: {
            "temp": temp,
            "rh": rh
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
