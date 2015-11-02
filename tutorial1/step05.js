var myData = [ 22, 15, 200];
var HEIGHT = 20;

var chart = d3.select("#chart05")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);

var redraw = function (myData) {
    var items = chart.selectAll("rect")
        .data(myData);    
    items.enter()
        .append("rect")
        .attr("width", 0);
    
    items
        .transition()
        .duration(1000)
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i * (HEIGHT + 1);
        })
        .attr("width", function (d) {
            return d;
        })    
        .attr("height", HEIGHT);
    
    items.exit().remove();
};


redraw(myData);
