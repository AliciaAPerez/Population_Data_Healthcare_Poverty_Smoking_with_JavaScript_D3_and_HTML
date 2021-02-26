console.log("hello");

// loading csv data
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);
})
