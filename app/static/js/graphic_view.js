var globalVars = {unloaded:true};
var series_list = [];
var chart
var root

$(window).bind('beforeunload', function(){
    console.log("before unload");
    globalVars.unloaded = true;
});


window.addEventListener('load', function() {

    var temperature_slider = document.getElementById("temperature");

    sliderChanger(0.96)

    AddEventListenerOnSlider(temperature_slider, RefreshGraphicByTemperature)

    RefreshGraphicByTemperature()

    loadAmChart()
})

function RefreshGraphicByTemperature(){
    let temp = $('#temperature').val()
    $.ajax(
        {
        url:"/post_graphic_request",
        type:"POST",
        data: {
            "temp": temp,
        },
        success: function(response){
            console.log("INFO: Succesfull calculation" + JSON.stringify(response))
            loadNewData(response.processed)
        },
        error: function(error){
            console.log("ERROR: Unespected error => " + error.status)
        },
    });
}


function reloadData() {
    var newdata = [{ 
            "RH": 1, 
            "ab_hu": 1200,
            "entalpie_kg": 2345
        }, { 
            "RH": 20, 
            "ab_hu": 2000,
            "entalpie_kg": 2145
        }, { 
            "RH": 50, 
            "ab_hu": 880,
            "entalpie_kg": 2345
        }];
    return newdata;
}

function loadNewData(new_data) {

    for (let i = 0; i < series_list.length; i++) {
        series_list[i].data.setAll(new_data);
    }
}


function createAxisAndSeries(data, opposite, value_label, units) {
        
    var yRenderer = am5xy.AxisRendererY.new(root, {
      opposite: opposite
    });

    var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: yRenderer,
            min: 0
        })
    );
  
    if (chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
    }
  
    // Add series
    series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: value_label,
            valueXField: "RH",
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: `{valueY}  ${units}`  
            })
        })
    );

    series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
    series.strokes.template.setAll({ strokeWidth: 1 });

    yRenderer.grid.template.set("strokeOpacity", 0.05);
    yRenderer.labels.template.set("fill", series.get("fill"));
    yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
    });

series.data.setAll(data);

series_list.push(series);

}

function loadAmChart() {

    var data = []
    // Create root and chart
    root = am5.Root.new("chartdiv"); 
    chart = root.container.children.push( 
        am5xy.XYChart.new(root, {
            focusable: true,
            //panX: true,
            //panY: true,
            //wheelX: "panX",
            //wheelY: "zoomX",
            //pinchZoomX: true
        }) 
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

    // Create X-Axis
    xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            min: 0,
            max: 100,
        })
    );
    xAxis.data.setAll(data);

    createAxisAndSeries(data, false, "ab_hu", "gr/kg");
    createAxisAndSeries(data, true, "entalpie_kg", "KJ/Kg");

    // Add legend
    var legend = chart.children.push(
        am5.Legend.new(root, {}
    )); 
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
}

