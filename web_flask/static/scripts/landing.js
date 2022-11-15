const dataset = [10, 45, 26, 29];
const nameset = ["Users", "Foods", "Restaurants", "Reviews"];
const w = 500;
const h = 200;


$(document).ready(function(){
    $("#user-number").text(dataset[0]);
    $("#food-number").text(dataset[1]);
    $("#restaurant-number").text(dataset[2]);
    $("#review-number").text(dataset[3]);
});


const svg = d3.select("#cont-svg")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 90)
    .attr("y", (d, i) => h - 3 * d)
    .attr("width", 75)
    .attr("height", (d, i) => d * 3)
    .attr("fill", "navy")
    .attr("class", "bar")
    .append("title")
    .text((d, i) => (`${d} ${nameset[i]}`))

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text((d, i) => nameset[i])
    .attr("x", (d, i) => i * 90)
    .attr("y", (d, i) => h - (d * 3 + 9))