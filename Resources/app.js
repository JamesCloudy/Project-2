

// // Step 1: Set up our chart
// //= ================================
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// // =================================
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // // Step 3:
// // // Import data from the donuts.csv file
// // =================================
// // d3.csv("stl_accident_data.csv").then(function(error, stl_accident_data) {
// //   if (error) throw error;

// //   // Step 4: Parse the data
// //   // Format the data and convert to numerical and date values
// //   // =================================
// //   // Create a function to parse date and time
// //   var parseTime = d3.timeParse("%d-%b");

// //   // Format the data
// //   stl_accident_data.forEach(function(data) {
// //     data.Date = parseTime(data.Date);
// //     // data.Injured = +data.Injured;
// //     // data.Killed = +data.Killed;
// //     console.log(data)
// //   });
// // })

// d3.csv("STLCrashCSVwLatLong.csv", function(stl_accident_data) {


//     // Step 4: Parse the data
//     // Format the data and convert to numerical and date values
//     // =================================
//     // Create a function to parse date and time
//     // var parseTime = d3.timeParse("%m-%d-%Y");
   
//     // Format the data
//     stl_accident_data.forEach(function(data) {
//       // data.Date = parseTime(data.Date);

//       data.Date = new Date(data.Date);
// //     date: new Date(d.date),
// //     value: +d.value         // convert string to number
// //   };
// // } 
//       data.Injured = +data.Injured;
//       data.Killed = +data.Killed;
//       //console.log(data);
//       // console.log(data.length)
//     });
   

// //   // Step 5: Create Scales
// //   //= ============================================
//   var xTimeScale = d3.scaleTime()
//     .domain(d3.extent(stl_accident_data, function(data){return data.Date}))
//     .range([0, width]);

//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(stl_accident_data, d => d.Injured)])
//     .range([height, 0]);

// //   var yLinearScale2 = d3.scaleLinear()
// //     .domain([0, d3.max(donutData, d => d.evening)])
// //     .range([height, 0]);

// //   // Step 6: Create Axes
// //   // =============================================
//    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
//    var leftAxis = d3.axisLeft(yLinearScale);
// //   var rightAxis = d3.axisRight(yLinearScale2);


// //   // Step 7: Append the axes to the chartGroup - ADD STYLING
// //   // ==============================================
// //   // Add bottomAxis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

// //   // CHANGE THE TEXT TO THE CORRECT COLOR
//   chartGroup.append("g")
//     .attr("stroke", "green") // NEW!
//     .call(leftAxis);

// //   // CHANGE THE TEXT TO THE CORRECT COLOR
// //   chartGroup.append("g")
// //     .attr("transform", `translate(${width}, 0)`)
// //     .attr("stroke", "orange") // NEW!
// //     .call(rightAxis);


// //   // Step 8: Set up two line generators and append two SVG paths
// //   // ==============================================
// //   // Line generators for each line
//   var line = d3
//     .line()
//     .x(d => xTimeScale(d.Date))
//     .y(d => yLinearScale(d.Injured));

// //   var line2 = d3
// //     .line()
// //     .x(d => xTimeScale(d.date))
// //     .y(d => yLinearScale2(d.evening));

// //   // Append a path for line1
//   chartGroup.append("path")
//     .data([stl_accident_data])
//     .attr("d", line)
//     .classed("line orange", true);

// //   // Append a path for line2
// //   chartGroup.append("path")
// //     .data([donutData])
// //     .attr("d", line2)
// //     .classed("line orange", true);

// //   // NEW! Step 9: Add color coded titles to the x-axis
// //   // YOUR CODE HERE

//   chartGroup.append("text")
//     // Position the text
//     // Center the text:
//     // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
//     .attr("text-anchor", "middle")
//     .attr("font-size", "16px")
//     .attr("fill", "orange")
//     .text("Injured Data in St.Louis");

// //   chartGroup.append("text")
// //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
// //     .attr("text-anchor", "middle")
// //     .attr("font-size", "16px")
// //     .attr("fill", "orange")
// //     .text("Evening Donut Craving Level");

// });

var map = L.map("map", {
  center: [ 38.6270, -90.1994],
  zoom: 12
});


// Then send the api request 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(map);


d3.csv("STLCrashCSVwLatLongCleared.csv",  function(data) {

      //console.log(data);
      // plotMap(data);
      //data.Injured = +data.Injured;
    //data.Coordinate = +data.Coordinate;


      for (var i = 0; i < 1000; i++) {
        //console.log(data[i].Coordinate);
        var cor = L.latLng(data[i].Latitude, data[i].Longitude);
        //console.log(data[i].Latitude);
          L.circle(cor).bindPopup("<h1>Address: " + data[i].Address + "</h1> <hr> <h3>Injured: " + data[i].Injured + "</h3>").addTo(map)
      }
      
      
});


/** We can start by putting data on the map 
* 
*   Step 1: put the data on the map. 
*        1.1 Since we are using geoJson data we need to use the L.geoJson function to plot the data on the map
*        1.2 Resources -- https://leafletjs.com/reference-1.3.4.html#geojson
* 
* 
*   Step 2: We can use the options in the GeoJson file to color our map 
*        2.1: We need to color the map based on the Earthquake Manitude
*/

  // function plotMap(data){

  //   for (var i = 0; i < data.length; i++) {
    
  //   //   var color = "";
  //   //   if (earthquakedata[i].properties["mag"] <=1 ) {
  //   //     color = "#F5F5DC";
  //   //   }
  //   //   else if (earthquakedata[i].properties["mag"] <=2) {
  //   //     color = "#FFB6C1";
  //   //   }
  //   //   else if (earthquakedata[i].properties["mag"] <=3) {
  //   //     color = "#E9967A";
  //   //   }
  //   //   else if (earthquakedata[i].properties["mag"] <=4) {
  //   //     color = "#D2691E";
  //   //   }
  //   //   else if (earthquakedata[i].properties["mag"] <=5) {
  //   //     color = "#B22222";
  //   //   }
  //   //   else {
  //   //     color = "#800000";
  //   //   }
    
      
  //     L.circle(data[i].Coordinate, {
  //       fillOpacity: 0.75,
  //       color: "none",
  //       fillColor: "yellow",
  //       radius: 7
  //     }.bindPopup("<h1>Address: " + data[i].Address + "</h1> <hr> <h3>Injured: " + data[i].Injured + "</h3>").addTo(map)
  // ).addTo(map)
    
  //   }
  // }

