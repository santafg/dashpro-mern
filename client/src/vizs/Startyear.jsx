import React, { useEffect, useRef }  from 'react'
import {
    select,
    scaleLinear,
    scaleBand,
    axisBottom,
    axisRight,
  } from "d3";

const Startyear = ({list}) => {
    let start_year = list.map((user) => {
        return user.start_year;
      });
      // console.log(start_year);
      let unique = [...new Set(start_year)]
    //   console.log(unique);
      let x = unique.filter((val)=> {
        return val !== null
    }).sort(); 
     let arr =  x.map((names) => {
        return start_year.filter((val)=>{
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
        const yScale = scaleLinear().domain([0, 180]).range([160, 0]);
    
        const xAxis = axisBottom(xScale);
        svg.select(".x-axis").style("transform", "translateY(16rem)").call(xAxis).style('font' , '1.2rem times');
    
        const yAxis = axisRight(yScale).ticks(5);
        svg.select(".y-axis").style("transform", "translateX(60rem)").call(yAxis).style('font' , '1.2rem times');
    
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
              .text(value).style('font' , '1.5rem times')
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
             <div className="vizStart">
        <svg id='startYear' ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <h1>Start Year</h1>
      </div>
        </>
    )
}

export default Startyear
