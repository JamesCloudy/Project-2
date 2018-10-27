// Plot the default route once the page loads

var crashdata=d3.json("/data").then(function(data) {
console.log(data);
});
console.log("est",crashdata);

// Update the plot with new data
function updatePlotly(newdata) {
  Plotly.restyle("bar", "x", [newdata.x]);
  Plotly.restyle("bar", "y", [newdata.y]);
  console.log("hi2")
}

// Get new data whenever the dropdown selection changes
function getData() {
  var defaultURL = "/data";

  console.log(route);
  d3.json(defaultURL).then(function(data) {
    console.log("newdata", data);
    updatePlotly(data);
  });
}
