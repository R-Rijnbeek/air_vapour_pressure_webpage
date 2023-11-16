
window.addEventListener('load', function() {
    var temperature_slider = document.getElementById("temperature");

    var temperature_value = document.getElementById("temperature_value");

    temperature_value.innerHTML = temperature_slider.value;

    temperature_slider.oninput = function() {
        temperature_value.innerHTML = this.value;
    }


    var relative_humidity_slider = document.getElementById("relative_humidity");

    var relative_humidity_value = document.getElementById("relative_humidity_value");

    relative_humidity_value.innerHTML = relative_humidity_slider.value;
    
    relative_humidity_slider.oninput = function() {
        relative_humidity_value.innerHTML = this.value;
    }
    
})
