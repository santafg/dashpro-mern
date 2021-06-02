import React, { useEffect, useRef }  from 'react'
import {
    select,
    scaleLinear,
    scaleBand,
    axisBottom,
    axisRight,
  } from "d3";

const Endyear = ({list}) => {
    let end_year = list.map((user) => {
        return user.end_year;
      });
      // console.log(end_year);
      let unique = [...new Set(end_year)]
      // console.log(unique);
      let x = unique.filter((val)=> {
        return val !== ''
    }).sort(); 
     let arr =  x.map((names) => {
        return end_year.filter((val)=>{
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
          .range([0, 650]).padding(.2);
        const yScale = scaleLinear().domain([0, 60]).range([220, 0]);
    
        const xAxis = axisBottom(xScale);
        svg.select(".x-axis").style("transform", "translateY(22rem)").call(xAxis).style('font' , '1.1rem times');
    
        const yAxis = axisRight(yScale).ticks(5);
        svg.select(".y-axis").style("transform", "translateX(65rem)").call(yAxis).style('font' , '1.2rem times');
    
        const colorScale = scaleLinear()
        .domain([10, 30 , 60])
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
              .text(value)
              .attr("x", xScale(x[index]) + xScale.bandwidth()/2)
              .attr('text-anchor' , 'middle')
              .attr("y", yScale(value) - 5)
              .transition()
              .attr('opacity' , 1);
          })
          .on("mouseleave", () => svg.select(".tooltip").remove())
          .attr("fill", colorScale)
          .attr("height", (value) => 220 - yScale(value));
      }, [y]);

    return (
        <>
             <div className="vizEnd">
        <svg id='endYear' ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <h1>End Year</h1>
      </div>
        </>
    )
}

export default Endyear
