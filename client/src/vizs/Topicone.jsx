import React, { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisRight,
  index,
} from "d3";

const Topicone = ({ list }) => {
  
  let topic = list.map((user) => {
    return user.topic;
  });
  let unique = [...new Set(topic)]
  // console.log(unique);
  let a = unique.filter((val)=> {
    return val !== ""
}).sort(); 
let x = a.splice(0 , 47)
// console.log(x);
 let arr =  x.map((names) => {
    return topic.filter((val)=>{
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
      .domain(x.map((value, index) => index + 1))
      .range([0, 1000]).padding(.2);
    const yScale = scaleLinear().domain([0, 100]).range([300, 0]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", "translateY(30rem)").call(xAxis);

    const yAxis = axisRight(yScale).ticks(5);
    svg.select(".y-axis").style("transform", "translateX(100rem)").call(yAxis);

    const colorScale = scaleLinear()
    .domain([50, 100 , 230])
    .range(['#0818A8' , '#4169E1' , "#4682B4"]);

    svg
      .selectAll(".bar")
      .data(y)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value, index) => xScale(index + 1))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join("text")
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index + 1) + xScale.bandwidth()/2)
          .attr('text-anchor' , 'middle')
          .attr("y", yScale(value) - 1)
          .transition()
          .attr('opacity' , 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .attr("fill", colorScale)
      .attr("height", (value) => 300 - yScale(value));
  }, [y]);
  return (
    <>
      <div className="viz viz-list">
        <svg className='inten' ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <h1>Topic - 1</h1>
        <div className="conList">
          {
            x.map((val , index)=>{
              return (
                <h3 key={index}> ({index + 1}) <span>{val}</span></h3>
              )
            })
          }
          
          
        </div>
      </div>
    </>
  );
};

export default Topicone;
