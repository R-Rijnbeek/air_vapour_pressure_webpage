function sliderChanger(correction) {

    var el, newPoint, newPlace, offset;
 
        $('input[type=range]').on('input', function () {
            $(this).trigger('change');
        });
        // Select all range inputs, watch for change
        $("input[type='range']").change(function() {
        
         // Cache this for efficiency
         el = $(this);
         
         // Measure width of range input
         width = el.width();
         
         // Figure out placement percentage between left and right of input
         newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
          
          offset = -1;
        
         // Prevent bubble from going beyond left or right (unsupported browsers)
         if (newPoint < 0) { newPlace = 0; }
         else if (newPoint > 1) { newPlace = width; }
         else { newPlace = width * newPoint + offset; offset -= newPoint; }
         
         // Move bubble
         el
           .next("output")
           .css({
             left: newPlace*correction, //custom added problems with buildin margins
             marginLeft: offset*correction + "%" //custom added problems with buildin margins
           })
             .text(el.val());
         })
         // Fake a change to position bubble at page load
         .trigger('change');
}

function AddEventListenerOnSlider(sliderDOM, method) {
    sliderDOM.addEventListener("change", () => {
        method();
    })
}

function MakeUpKeys(key) {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    return key.replaceAll("_", " ")
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
        td.appendChild(document.createTextNode(MakeUpKeys(key)));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(value));
        tr.appendChild(td);
  
    });
    
    var myTableDiv = document.getElementById("tableDiv");
    myTableDiv.innerHTML = table.outerHTML;
}
