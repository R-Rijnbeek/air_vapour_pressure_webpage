var globalVars = {unloaded:true};
var series1;
//var xAxis;

$(window).bind('beforeunload', function(){
    console.log("before unload");
    globalVars.unloaded = true;
});

function reloadData() {
    var newdata = [{ 
            "RH": 1, 
            "ab_hu": 1200
        }, { 
            "RH": 2, 
            "ab_hu": 2000
        }, { 
            "RH": 3, 
            "ab_hu": 880
        }];
    return newdata;
}

function loadNewData() {
    series1.data.setAll(reloadData());
    //xAxis.data.setAll(reloadData());
}


window.addEventListener('load', function() {

    var data = [{ 
        "RH": 1, 
        "ab_hu": 1000
        }, { 
        "RH": 2, 
        "ab_hu": 2200
        }, { 
        "RH": 3, 
        "ab_hu": 850
    }];

    loadAmChart(data)
})

function loadAmChart(data) {

    // Create root and chart
    var root = am5.Root.new("chartdiv"); 
    var chart = root.container.children.push( 
        am5xy.XYChart.new(root, {
            panY: false,
            layout: root.verticalLayout
        }) 
    );

    // Craete Y-axis
    var yAxis = chart.yAxes.push( 
        am5xy.ValueAxis.new(root, { 
            min: 0,
            max: 3000,
            renderer: am5xy.AxisRendererY.new(root, {}) 
        }) 
    );

    // Create X-Axis
    xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            min: 0,
            max: 100,
            categoryField: "RH"
        })
    );
    xAxis.data.setAll(data);

    // Create series
    series1 = chart.series.push( 
        am5xy.LineSeries.new(root, { 
            name: "Series", 
            xAxis: xAxis, 
            yAxis: yAxis, 
            valueYField: "ab_hu", 
            categoryXField: "RH" 
        }) 
    );
    series1.data.setAll(data);

    // Add legend
    var legend = chart.children.push(
        am5.Legend.new(root, {}
    )); 
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
}

