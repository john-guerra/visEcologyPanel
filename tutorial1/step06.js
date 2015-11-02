var myData = [1,2,3];
var HEIGHT = 20;

var wScale = d3.scale
    .linear()
    .domain([0, d3.max(myData)])
    .range([0, 400]);
var colScale = d3.scale
    .category20();


var chart = d3.select("#chart06")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

var redraw = function (myData) {
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
            return i * (HEIGHT + 1);
        })
        .attr("width", function (d) {
            return wScale(d);
        })    
        .attr("height", HEIGHT);
    
    items.exit().remove();
};


redraw(myData);
