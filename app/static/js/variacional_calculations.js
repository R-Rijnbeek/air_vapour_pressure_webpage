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
}