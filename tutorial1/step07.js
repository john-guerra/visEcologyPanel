var myData = [1,2,3,50,4,3,2,1];
var HEIGHT = 20;
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var wScale = d3.scale
    .linear()
    .domain([0, d3.max(myData)])
    .range([0, width]);
var yScale = d3.scale
    .linear()
    .domain([0, myData.length])
    .range([0, height]);
var xAxis = d3.svg.axis()
    .scale(wScale)
    .tickSize(5)
    .tickSubdivide(true)
    .orient("top");
var yAxis  = d3.svg.axis()
    .scale(yScale)
    .ticks(4)
    .orient("left");

var colScale = d3.scale
    .category20();


var chart = d3.select("#chart07")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Add the x-axis.
chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + 0 + ")")
    .call(xAxis);

// Add the x-axis.
chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);


var redraw = function (myData) {
    wScale.domain([0,d3.max(myData)]);
    yScale.domain([0,myData.length]);
    var items = chart.selectAll("rect")
        .data(myData);    
    items.enter()
        .append("rect")
        .attr("width", 0)
        .style("fill", function (d) {
            return colScale(d);
        });
    
    items
        .transition()
        .duration(1000)
        .attr("x", 0)
        .attr("y", function (d,i) {
            return yScale(i);
        })
        .attr("width", function (d) {
            return wScale(d);
        })    
        .attr("height", HEIGHT);
    
    items.exit().remove();
    
    chart.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);
    
    chart.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);    
};


redraw(myData);
