import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleBand,
  axisTop,
  axisLeft,
  index,
} from "d3";

const Region = ({ list }) => {
  
  let region = list.map((user) => {
    return user.region;
  });
  let unique = [...new Set(region)]
  // console.log(unique);
  let y = unique.filter((val)=> {
    return val !== ""
}).sort(); 
// console.log(y);
 let arr =  y.map((names) => {
    return region.filter((val)=>{
        return val === names
    })
});
let x = (arr.map((val)=>{
    return val.length
}))
// console.log(x);
// console.log(y);
  const svgRef = useRef();

  

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0,140]).range([0, 500]);
    const yScale = scaleBand()
      .domain(y)
      .range([0, 600]).padding(.2);
    const xAxis = axisTop(xScale).ticks(5);
    svg.select('.x-axis').call(xAxis).style('font' , '1.3rem times')
    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis).style('font' , '1.3rem times');

    const colorScale = scaleLinear()
    .domain([10, 50 , 410])
    .range(['#0818A8' , '#4169E1' , "#4682B4"]);

    svg.selectAll('rect').data(x).enter().append('rect')
    .attr('y' , (value, index) => yScale(y[index]))
    .attr("width", (value) => xScale(value))
    .attr("height", yScale.bandwidth())
    .attr("fill", colorScale)
    .on("mouseenter", (value, index) => {
            svg
              .selectAll(".tooltip")
              .data([value])
              .join("text")
              .attr("class", "tooltip")
              .text(value)
              .attr("y", yScale(y[index]) + yScale.bandwidth()/1.5)
              .attr('text-anchor' , 'middle')
              .attr("x", xScale(value) + 10)
              .transition()
              .attr('opacity' , 1);
          })
          .on("mouseleave", () => svg.select(".tooltip").remove())
  }, [x]);
  return (
    <>
      <div className="vizRegion">
        <h1>Region</h1>
        <svg id='region' ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

export default Region;
