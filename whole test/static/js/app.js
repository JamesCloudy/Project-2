const API_KEY="pk.eyJ1IjoicGF0cmlja3l1NjEyMTAxIiwiYSI6ImNqbjB4czVrcDBwM20zcnBia2l1cDI2OHgifQ.Q-MP65O4i2w_HMphgGb_LA";
var maptag = d3.select("#map");
// get data and print it 
var crashdata=d3.json("/data").then((data)=> {
console.log(data);
console.log("ggggggg",Object.values(data)[0].Lat);
console.log(data[0].Long);
makemap(data);
});


// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [38.6270, -90.1994],
  zoom: 13
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

// make map
function makemap(dataset){
  // maptag.html("");
  var dataL=Object.keys(dataset).length

var color=""
  // try{
  for (var i=0;i<dataL;i++){
    if (dataset[i].Severity =="Fatal" ) {
      color = "red";
    }
    else if (dataset[i].Severity =="Personl Injury") {
      color = "orange";
    }
    else if (dataset[i].Severity =="Property Damage") {
      color = "green";
    }
    var markers=L.circle([dataset[i].Lat,dataset[i].Long], {
      fillOpacity: 0.75,
      color: "none",
      fillColor: color,
      // Adjust radius
      radius: 500
    }).bindPopup("<h1>Date: " + dataset[i].Date + "</h1> <hr><h1>Weekday: " + dataset[i].Weekday + "</h1> <hr> <h1>Time: " + dataset[i].Time + "</h1><hr><h1>Type: " + dataset[i].Type + "</h1> <hr><h2>Severity: " + dataset[i].Severity + "</h2>").addTo(myMap);
  };

// }catch(error){
//   console.log(error)
// }
}
// End make map


// try {
//   eval('alert("Hello world)');
// }
// catch(error) {
//   console.error(error);
// }
// console.log("this is what i need?",data)

// d3.selectAll("#filterbtn").on("click", handleClick);
function handleClick() {
  maptag.html("");
  var crashdata=d3.json("/data").then((data)=> {
  // d3.event.preventDefault();
  var start_date = d3.select("#start_date").property("value");
  var end_date = d3.select("#end_date").property("value");
  var start_time = d3.select("#start_time").property("value");
  var end_time = d3.select("#end_time").property("value");
  var start_week = d3.select("#start_week").property("value");
  var end_week = d3.select("#end_week").property("value");
  var severity = d3.select("#severity").property("value");
  var crash_type = d3.select("#crash_type").property("value");
  // var date = d3.select("#datetime").property("value");
console.log(start_date,end_date,start_time,end_time,start_week,end_week,severity);
var cleaned=data;
var dataL=Object.keys(data).length;
// console.log(Object.values(cleaned)[0].Severity);
try{
  // for (var i=0;i<dataL;i++){
    
  // }
  (i,clean) => clean[i].Severity =="Fatal"
if (data) {
  console.log("test");
  cleaned = cleaned.filter(cleaned,(i,value) => cleaned[i].Severity =="Fatal");
}
}catch(error){
  console.log(error);
};  

console.log(cleaned);
makemap(cleaned);

});
//   d3.event.preventDefault();

  // var date = d3.select("#datetime").property("value");
//   let filteredData = tableData;
//   if (date) {
//     filteredData = filteredData.filter(row => row.datetime === date);
//   }
//   buildTable(filteredData);
}


