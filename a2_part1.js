var total = getTotals(citybike_data);
total = filterTotals(total);


//dimensions of bar charts
var height = 500;
var width = 600;
var barWidth = 14;
var barOffset = 5;

//select barchart on HTML page
var chart = d3.select("#barchart").append("svg")
    .attr('width', width)
    .attr('height', height)
    .style('background', 'grey')

    //apply all totals to each bar and calculate dimentions
    .selectAll('rect')
        .data(total)
        .enter().append('rect')
            .style('fill', 'blue')
            .attr('width', barWidth)        //bar width
            .attr('height', function(b){    //bar height
              let ratio = b / 80000;
              let barHeight = parseInt(ratio * 450);
              return barHeight;
            })

            .attr('x', function(d, i){      //x position
              return i * (barWidth + barOffset) + 10;
            })

            .attr('y', function(d){         //y positon
              let ratio = d / 80000;
              let barHeight = parseInt(ratio * 450);
              let y = 500 - barHeight;
              return y;
            })

function getTotals(data) {
    // get age ranges from first item (same for each item in the array)
    ranges = Object.keys(data[0]).filter(d => d != "day");
    return data.map(function(d) { 
  return {"day": d.day,
    "total": ranges.reduce(function(t, s) { return t + d[s]; }, 0)};
    });
}

//returns an array of only the totals
function filterTotals(data)
{
  let array = [];
  data.forEach(function(element){
    array.push(element.total);
  });
  return array;
}