var myData = [ 22, 15, 20];

var chart = d3.select("#chart03");

var redraw = function (myData) {
    var items = chart.selectAll("p")
        .data(myData);    
    items.enter().append("p");
    
    items
        .style("font-size", function (d) {
            return d + "pt";
        })
        .text("hola mundo");
    
    items.exit().remove();
};


redraw(myData);
