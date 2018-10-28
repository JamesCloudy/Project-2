const API_KEY="pk.eyJ1IjoicGF0cmlja3l1NjEyMTAxIiwiYSI6ImNqbjB4czVrcDBwM20zcnBia2l1cDI2OHgifQ.Q-MP65O4i2w_HMphgGb_LA";
var maptag = d3.select("#map");
// var layergroup=L.layerGroup([markers]);
var layergroup;
var markers;
// get data and print it 
var crashdata=d3.json("/data").then((data)=> {

makemap(data);
});
var myMap;
function mapping(){
    maptag.html("");
  myMap = L.map("map", {
    center: [38.6270, -90.1994],
    zoom: 13
  });
  
  var alllayer=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);  

  layergroup = new L.LayerGroup().addTo(myMap);
}
mapping();

// make map
function makemap(dataset){
  // maptag.html("");
//  try{
//     markers.clearLayers();  
//     }catch(error){ console.log(error)}
//   maptag.html("");


  var dataL=Object.keys(dataset).length

  var color=""
  try{
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
    // markers = L.markerClusterGroup();
    markers=L.circle([dataset[i].Lat,dataset[i].Long], {
      fillOpacity: 0.75,
      color: "none",
      fillColor: color,
      // Adjust radius
      radius: 500
    }).bindPopup("<h1>Date: " + dataset[i].Date + "</h1> <hr><h1>Weekday: " + dataset[i].Weekday + "</h1> <hr> <h1>Time: " + dataset[i].Time + "</h1><hr><h1>Type: " + dataset[i].Type + "</h1> <hr><h2>Severity: " + dataset[i].Severity + "</h2><hr><h2>County: " + dataset[i].County + "</h2>").addTo(layergroup);
  };

}catch(error){
  console.log(error)
}
}
// End make map


function handleClick() {
// console.log(markers)
  // try{
  //   markers.clearLayers();  
  //   }catch(error){ console.log(error)}
  // maptag.html("");
  layergroup.clearLayers();
  var crashdata=d3.json("/data").then((data)=> {
  // d3.event.preventDefault();
  var start_date = d3.select("#start_date").property("value");
  var end_date = d3.select("#end_date").property("value");
  var start_time = d3.select("#start_time").property("value");
  var end_time = d3.select("#end_time").property("value");
  var start_week = d3.select("#start_week").property("value");
  var end_week = d3.select("#end_week").property("value");
  var severityuser = d3.select("#severity").property("value");
  var crash_type = d3.select("#crash_type").property("value");
  var county = d3.select("#county").property("value");

  // var date = d3.select("#datetime").property("value");
console.log(start_date,end_date,start_time,end_time,start_week,end_week,crash_type,severityuser);


// console.log(result);
var cleaned=Object.values(data)
console.log("just=data");
console.log(cleaned);
var donedata=cleaned;
// try{
  if(severityuser=="All Crashes"){
  }else{
  donedata = donedata.filter(function(donedata) {
    // Severity

    return donedata.Severity==severityuser;
  });}

  if(crash_type=="All"){

  }else{

  donedata = donedata.filter(function(donedata) {
    // type
    return donedata.Type==crash_type;
  });}


  donedata = donedata.filter(function(donedata) {
    // county
    return donedata.County==county;
  });


// }catch(error){
//   console.log(error);
// };  
console.log("cleaned");
console.log(donedata);
// console.log(done);

makemap2(donedata);

});
}

// make 2
function makemap2(dataset){
////////////////

console.log("make2")
// /////////////


  // maptag.html("");
  var dataL=dataset.length
  console.log(dataL)
  console.log(dataset[0].Severity)

var color=""
  try{
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
    markers=L.circle([dataset[i].Lat,dataset[i].Long], {
      fillOpacity: 0.75,
      color: "none",
      fillColor: color,
      // Adjust radius
      radius: 500
    }).bindPopup("<h1>Date: " + dataset[i].Date + "</h1> <hr><h1>Weekday: " + dataset[i].Weekday + "</h1> <hr> <h1>Time: " + dataset[i].Time + "</h1><hr><h1>Type: " + dataset[i].Type + "</h1> <hr><h2>Severity: " + dataset[i].Severity + "</h2><hr><h2>County: " + dataset[i].County + "</h2>").addTo(layergroup);
  };

}catch(error){
  console.log(error)
}
}