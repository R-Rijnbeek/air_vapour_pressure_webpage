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
