//setting up svg wrapper
let svgwidth = 960;
let svgheight = 500;

let margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

let width = svgwidth - margin.left - margin.right;
let height = svgheight - margin.top - margin.bottom;

let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgwidth)
    .attr("height", svgheight);



// loading csv data
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);
})