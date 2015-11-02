var myData = [ 22, 15, 20];

var chart = d3.select("#chart02");

var items = chart.selectAll("p")
    .data(myData);

items.enter().append("p")
    .style("font-size", function (d) {
        return d + "pt";
    })
    .text("hola mundo");
