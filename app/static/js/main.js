function sliderChanger(slider,value) {

    value.innerHTML = slider.value;

    slider.oninput = function() {
        value.innerHTML = this.value;
    }
}

function AddEventListenerOnSlider(sliderDOM, method) {
    sliderDOM.addEventListener("change", () => {
        method();
    })
}

