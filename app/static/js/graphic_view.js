var globalVars = {unloaded:true};
var series1;
var series2;
var xAxis;
$(window).bind('beforeunload', function(){
    console.log("before unload");
    globalVars.unloaded = true;
});

function reloadData() {
    var newdata = [{ 
        category: "Research", 
        value1: 2000, 
        value2: 588 
      }, { 
        category: "Marketing", 
        value1: 1240, 
        value2: 1800 
      }, { 
        category: "Sales", 
        value1: 850, 
        value2: 1430 
      }];
    return newdata;
}

function loadNewData() {
    // var chartData = reloadData();
    series1.data.setAll(reloadData());
    series2.data.setAll(reloadData());
    xAxis.data.setAll(reloadData());
    // chart.validateData();
}


window.addEventListener('load', function() {
    // Create root and chart
var root = am5.Root.new("chartdiv"); 
var chart = root.container.children.push( 
  am5xy.XYChart.new(root, {
    panY: false,
    layout: root.verticalLayout
  }) 
);

// Define data
var data = [{ 
  category: "Research", 
  value1: 1000, 
  value2: 588 
}, { 
  category: "Marketing", 
  value1: 2200, 
  value2: 1800 
}, { 
  category: "Sales", 
  value1: 850, 
  value2: 1230 
}];

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
    categoryField: "category"
  })
);
xAxis.data.setAll(data);

// Create series
series1 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value1", 
    categoryXField: "category" 
  }) 
);
series1.data.setAll(data);

series2 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value2", 
    categoryXField: "category" 
  }) 
);
series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {})); 
legend.data.setAll(chart.series.values);

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {}));




})


