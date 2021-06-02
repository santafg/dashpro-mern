import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisRight,
} from "d3";

const Inten = ({ list }) => {
  

  let intensity = list.map((user) => {
    return user.intensity;
  });
  // console.log(intensity);
  let unique = [...new Set(intensity)]
  // console.log(unique);
  let x = unique.filter((val)=> {
    return val !== null
}).sort(function (a , b) {
  return a - b
}); 
 let arr =  x.map((names) => {
    return intensity.filter((val)=>{
        return val === names
    })
});
let y = (arr.map((val)=>{
    return val.length
}))
// console.log(x);
// console.log(y);

const svgRef = useRef();


  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(x)
      .range([0, 600]).padding(.2);
    const yScale = scaleLinear().domain([0, 230]).range([160, 0]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", "translateY(16rem)").call(xAxis).style('font' , '1.3rem times');

    const yAxis = axisRight(yScale).ticks(5);
    svg.select(".y-axis").style("transform", "translateX(60rem)").call(yAxis).style('font' , '1.3rem times');

    const colorScale = scaleLinear()
    .domain([50, 100 , 230])
    .range(['#0818A8' , '#4169E1' , "#4682B4"]);

    svg
      .selectAll(".bar")
      .data(y)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value, index) => xScale(x[index]))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join("text")
          .attr("class", "tooltip")
          .text(value).style('font' , '1.3rem times')
          .attr("x", xScale(x[index]) + xScale.bandwidth()/2)
          .attr('text-anchor' , 'middle')
          .attr("y", yScale(value) - 5)
          .transition()
          .attr('opacity' , 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .attr("fill", colorScale)
      .attr("height", (value) => 160 - yScale(value));
  }, [y]);
  return (
    <>
      <div className="vizInten">
        <svg id='inten' ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <h1>Intensity</h1>
      </div>
    </>
  );
};

export default Inten;
