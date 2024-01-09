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

function refrehTable(response) {
    
    var table = document.createElement('TABLE');
    table.classList.add("w3-table");
    table.classList.add("w3-striped");

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var header = document.createElement('TR');
    tableBody.appendChild(header);
 
    var th = document.createElement('TH');
    th.appendChild(document.createTextNode("properties"));
    header.appendChild(th);

    var th = document.createElement('TH');
    th.appendChild(document.createTextNode("value"));
    header.appendChild(th);


    tableBody.appendChild(header);

    air_info = response.processed
        
    Object.entries(air_info).forEach(([key, value]) => {

        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(key));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(value));
        tr.appendChild(td);
  
    });
    
    var myTableDiv = document.getElementById("tableDiv");
    myTableDiv.innerHTML = table.outerHTML;
}


