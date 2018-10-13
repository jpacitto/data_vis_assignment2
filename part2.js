//all age attributes of the citybike data
var ages = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130"];

//width and height of chart
var width = 1000;
var height = 600;

//margins for positioning stacked bar chart
var margin = {top: 20, right: 50, bottom: 30, left: 50};


//set the vertical y-axis scale
var y = d3.scale.linear()
        .rangeRound([height, 10]);

//set the horizonal x-axis scale
var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2);

//set the x-axis label at the bottom of the chart
var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

//set the y-axis label at the left side of the chart
var yAxis = d3.svg.axis()
	.scale(x)
	.orient("left");

//create the bar with proper dimensions and margins
var chart = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//create dataStack of all the age totals
var dataStack = ages.map(function (a) {
    return citybike_data.map(function (b) {

        return {x: b.day, y: b[a]};
    });
});

//modify the layout to include the datastack
var dataLayout = d3.layout.stack()(dataStack);

//map the layout to the x-axis
x.domain(dataLayout[0].map(function (d) {
    return d.x;
}));

//set the height of the bar according to the y domain
y.domain([0,
    d3.max(dataLayout[dataLayout.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();

//set color of stack values
var color = d3.scale.category20c();
var bar = chart.selectAll(".stack")
        .data(dataLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });

//add the svg bars to the chart
bar.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

//append the x-axis labels
chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);