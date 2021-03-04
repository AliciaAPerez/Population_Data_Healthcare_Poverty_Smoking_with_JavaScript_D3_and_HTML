
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

let chartgroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let chosenXaxis = "proverty";
    
function xScale(data, chosenXaxis) {
    let xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXaxis]),
    d3.max(data, d => d[chosenXaxis])
    ])
    .range([0, width]);

    return xLinearScale;

}

function renderAxes(newXScale, xAxis) {
    let bottomaxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomaxis);
    
    return xAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXaxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXaxis]));
    
    return circlesGroup;
}




// loading csv data
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);
})