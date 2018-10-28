


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
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// small data
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";



  d3.json(`/${data}`).then((data) => {
  // console.log(data);
  // });
  // console.log("est",crashdata);

//   // d3.csv("STLCrashCSVwLatLongCleared.csv",  function(data) {

//           //console.log(data);
//           // plotMap(data);
//           //data.Injured = +data.Injured;
//         //data.Coordinate = +data.Coordinate;
    
    
          for (var i = 0; i < 1000; i++) {
            //console.log(data[i].Coordinate);
            var cor = L.latLng(data[i].Lat, data[i].Long);
            //console.log(data[i].Latitude);
              L.marker(cor).bindPopup("<h1>Address: " + data[i].Address + "</h1> <hr> <h3>Injured: " + data[i].Injured + "</h3>").addTo(map)
          }
          
          
    });
// // d3.json(queryUrl, function(data) {
// //   console.log(data.features);
// //   createFeatures(data.features);
// // }); 

// // function createFeatures(earthquakedata){

// // for (var i = 0; i < earthquakedata.length; i++) {

// //   var color = "";
// //   if (earthquakedata[i].properties["mag"] <=1 ) {
// //     color = "#C2E9A0";
// //   }
// //   else if (earthquakedata[i].properties["mag"] <=2) {
// //     color = "#97D85E";
// //   }
// //   else if (earthquakedata[i].properties["mag"] <=3) {
// //     color = "yellow";
// //   }
// //   else if (earthquakedata[i].properties["mag"] <=4) {
// //     color = "orange";
// //   }
// //   else if (earthquakedata[i].properties["mag"] <=5) {
// //     color = "darkorange";
// //   }
// //   else {
// //     color = "red";
// //   }

// //   // Add circles to map
// //   L.circle([earthquakedata[i].geometry.coordinates[1],earthquakedata[i].geometry.coordinates[0]], {
// //     fillOpacity: 0.75,
// //     color: "none",
// //     fillColor: color,
// //     // Adjust radius
// //     radius: earthquakedata[i].properties["mag"] * 15000
// //   }).bindPopup("<h1>Title: " + earthquakedata[i].properties["title"] + "</h1> <hr> <h3>Magnitude: " + earthquakedata[i].properties["mag"] + "</h3>").addTo(myMap);
// // };


// // // var overlayMaps = {
// // //   Cities: cityLayer
// // // };
// // // L.control.layers(overlayMaps).addTo(myMap);
// // function getColor(d) {
// //   return d <=1 ? '#C2E9A0' :
// //          d <=2  ? '#97D85E' :
// //          d <= 3 ? 'yellow' :
// //          d <= 4 ? 'orange' :
// //          d <= 5  ? 'darkorange' :
// //                     '#darkorange';
// // }


// // var legend = L.control({position: 'bottomright'});
// // legend.onAdd = function (myMap) {

// //   var div = L.DomUtil.create('div', 'legend'),
// //       grades = [0, 1, 2, 3, 4, 5],
// //       labels = [];

// //   // loop through our density intervals and generate a label with a colored square for each interval
// //   for (var i = 0; i < grades.length; i++) {
// //       div.innerHTML +=
// //           '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
// //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
// //   }

// //   return div;
// // };

// // legend.addTo(myMap);


// // };
// function buildmap(data) {
//   d3.json(`/${data}`).then((data) => {
//     // Use d3 to select the panel with id of `#sample-metadata`
//     var PANEL = d3.select("#sample-metadata");

//     // Use `.html("") to clear any existing metadata
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(data).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key}: ${value}`);
//     });

//     // BONUS: Build the Gauge Chart
//     buildGauge(data.WFREQ);
//   });
// }

// function buildCharts(sample) {
//   d3.json(`/samples/${sample}`).then((data) => {
//     const otu_ids = data.otu_ids;
//     const otu_labels = data.otu_labels;
//     const sample_values = data.sample_values;

//     // Build a Bubble Chart
//     var bubbleLayout = {
//       margin: { t: 0 },
//       hovermode: "closest",
//       xaxis: { title: "OTU ID" }
//     };
//     var bubbleData = [
//       {
//         x: otu_ids,
//         y: sample_values,
//         text: otu_labels,
//         mode: "markers",
//         marker: {
//           size: sample_values,
//           color: otu_ids,
//           colorscale: "Earth"
//         }
//       }
//     ];

//     Plotly.plot("bubble", bubbleData, bubbleLayout);

//     // Build a Pie Chart
//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
//     var pieData = [
//       {
//         values: sample_values.slice(0, 10),
//         labels: otu_ids.slice(0, 10),
//         hovertext: otu_labels.slice(0, 10),
//         hoverinfo: "hovertext",
//         type: "pie"
//       }
//     ];

//     var pieLayout = {
//       margin: { t: 0, l: 0 }
//     };

//     Plotly.plot("pie", pieData, pieLayout);
//   });
// }

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }

// // Initialize the dashboard
// init();
