var HEIGHT = 20;
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var FlickrUtils = {};

FlickrUtils.getImgForPhoto = function (ID, server_ID, farm_ID, secret) {
	//TODO escape variables for security
	// return "https://farm" + farm_ID + "\.staticflickr.com/" + server_ID+ "/" + ID + "_" + secret + "_m.jpg";
    var u =  "https://farm" + Math.floor(farm_ID);
    u +=  "." + "staticflickr.com/" + server_ID+ "/" + ID + "_" + secret + "_m.jpg";
    return u;
};

FlickrUtils.getUrlForPhoto = function (ID, owner_ID) {
    //TODO escape variables for security
    return "https://www.flickr.com/photos/" + owner_ID + "/" + ID;
};


var wScale = d3.scale
    .linear()
    .range([0, width]);
var yScale = d3.scale
    .linear()
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


var chart = d3.select("#chart10")
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


var redraw = function (myData, xAttr, yAttr) {
    myData.forEach(function (d) {
        d[xAttr] = +d[xAttr];
        d[yAttr] = +d[yAttr];
    });
    
    var xAcc = function (d) {return d[xAttr];};
    var yAcc = function (d) {return d[yAttr];};
    
    wScale.domain([0, d3.max(myData, xAcc )]);
    yScale.domain([0, d3.max(myData, yAcc )]);
    
    
    var items = chart.selectAll("circle")
        .data(myData, function (d) { return d.id; } );    
    items.enter()
        .append("circle")
        .attr("cx", 0)
        .style("fill", function (d) {
            return colScale(d.id);
        })
        .on("mouseover", function (d) {
            d3.select("#image10")
            .attr("src", FlickrUtils.getImgForPhoto(d.id, 
                                                    d.server, 
                                                    d.farm, 
                                                    d.secret));
        });
    
    items
        .transition()
        .duration(1000)
        .attr("cy", function (d) {
            return yScale(d[yAttr]);
        })
        .attr("cx", function (d) {
            return wScale(d[xAttr]);
        })    
        .attr("r", 10);
    
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

d3.json("https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=53ecac56654e39cf9d2cf52fbecdfc6b&extras=count_views%2C+count_faves%2C+count_comments&format=json&nojsoncallback=1",
        function (error, data) {

            redraw(data.photos.photo, "count_views", "count_comments");
            d3.select("#attrSelect")
            .on("change", function (d) {
                redraw(data.photos.photo, this.value, "count_comments");
            });            
        })

