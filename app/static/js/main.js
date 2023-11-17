
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

    AirPropertiesCalculation();
    
})

function AirPropertiesCalculation(){
    let temp = $('#temperature').val()
    let hr = $('#relative_humidity').val();
    $.ajax(
        {
        url:"/post_request",
        type:"POST",
        data: {
            "temp": temp,
            "hr": hr
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
