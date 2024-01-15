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

function loadNewData(new_data) {

    for (let i = 0; i < series_list.length; i++) {
        series_list[i].data.setAll(new_data);
    }
}


function createAxisAndSeries(data, opposite, value_label, title, units) {
        
    var yRenderer = am5xy.AxisRendererY.new(root, {
      opposite: opposite,
      minGridDistance: 20
    });

    var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: yRenderer,
            min: 0
        })
    );

    yAxis.children.unshift(am5.Label.new(root, {
        text: `${title} (${units})`,
        textAlign: 'center',
        y: am5.p50,
        x:(!opposite) ? am5.p0 : am5.p100,
        rotation: -90,
      }));
  
    if (chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
    }
  
    // Add series
    series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: `${title} (${units})`,
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
            focusable: true
        }) 
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

    // Create X-Axis
    xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 20
            }),
            min: 0,
            max: 100,
        })
    );

    xAxis.children.push(am5.Label.new(root, {
        text: 'Humidity (%)',
        textAlign: 'center',
        x: am5.p50
      }));

    xAxis.data.setAll(data);

    createAxisAndSeries(data, false, "ab_hu", "Absolute Humidity", "gr/kg");
    createAxisAndSeries(data, true, "entalpie_kg", "Entalpie", "KJ/Kg");

    // Add legend
    var legend = chart.children.push(
        am5.Legend.new(root, {
            height: am5.percent(100),
            width:200,
            paddingLeft: 70
        }
    )); 
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
}

