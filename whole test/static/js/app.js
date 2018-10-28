const API_KEY="pk.eyJ1IjoicGF0cmlja3l1NjEyMTAxIiwiYSI6ImNqbjB4czVrcDBwM20zcnBia2l1cDI2OHgifQ.Q-MP65O4i2w_HMphgGb_LA";

// Plot the default route once the page loads

var crashdata=d3.json("/data").then((data)=> {
console.log(data);
console.log("ggggggg",Object.values(data)[0].Lat);
console.log(data[0].Long);
// var result = JSON.parse(data);
// console.log(result);
// data.map((sample) => {
//   console.log(Object.keys(sample));
// });  
// data.forEach((datas)=>{
// console.log("gggg",datas);
// });
makemap(data);
});
// console.log("test",crashdata);

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





// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [38.6270, -90.1994],
  zoom: 8
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
// actuall data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(queryUrl)
// small data
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";


d3.json(queryUrl, function(data) {
  // console.log("gg")
  console.log(data.features);
  createFeatures(data.features);
}); 

function makemap(dataset){
  var dataL=Object.keys(dataset).length
  console.log("here!",dataL);

  try{
  for (var i=0;i<dataL;i++){
    L.circle([dataset[i].Lat,dataset[i].Long], {
      fillOpacity: 0.75,
      color: "none",
      fillColor: "red",
      // Adjust radius
      radius: 100
    }).bindPopup("<h1>Date: " + dataset[i].Date + "</h1> <hr> <h3>Severity: " + dataset[i].Severity + "</h3>").addTo(myMap);
  };

}catch(error){
  console.log(error)
}
  console.log("what");
  
}

console.log("what end");



// try {
//   eval('alert("Hello world)');
// }
// catch(error) {
//   console.error(error);
// }