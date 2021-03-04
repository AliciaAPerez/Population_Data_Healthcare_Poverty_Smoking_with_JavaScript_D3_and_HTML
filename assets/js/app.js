
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

let chosenXaxis = "poverty";
    
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

function updateToolTip(chosenXaxis, circlesGroup) {
    let label;
    if (chosenXaxis === "poverty") {
        label = "Poverty";
    }
    else {
        label = "Healthcare";
    }

    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80,-60])
        .html(function(d) {
            return (`${d.rockband}<br>${label} ${d[chosenXaxis]}`);
        });
    
    circlesGroup.call(toolTip)

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
        .on("mouseout", function(daa, index) {
            toolTip.hide(data);
        });
    return circlesGroup;
}


// loading csv data
d3.csv("assets/data/data.csv").then(function(data, err) {
    console.log(data);
    if (err) throw err;

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.smokes = +data.smokers;
        data.obesity = +data.obesity;
        data.income = +income.obesity;
    });

    let xLinearScale = xScale(data, chosenXaxis);

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d = d.income)])
        .range([height, 0]);

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    let xAxis = chartgroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomaxis);

    chartgroup.append("g")
        .call(leftAxis);

    
})