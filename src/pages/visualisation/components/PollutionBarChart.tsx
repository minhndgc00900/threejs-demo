import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TopProvinceData } from '@utils/map';
import { formatProvinceName, normalText } from '@utils/map';
import { getColorByPollution } from '@utils/common';
import useMapStore from '@stores/useMapStore';

interface BarChartProps {
  data: TopProvinceData[];
  width?: number;
  height?: number;
  title?: string;
}

const PollutionBarChart = ({ 
  data,
  title,
  width = 350,
  height = 300
}: BarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const setCameraPosition = useMapStore((state) => state.setCameraPosition);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up dimensions and margins
    const margin = { top: 70, right: 50, bottom: 40, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + 38)
      .attr("height", height);

    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.pollutionLevel) || 0])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => formatProvinceName(d.name)))
      .range([0, innerHeight])
      .padding(0.3);

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`Top 10 Cities ${title}`);

    // Add bars with click interaction
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", d => yScale(formatProvinceName(d.name)) || 0)
      .attr("width", d => xScale(d.pollutionLevel))
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => getColorByPollution(d.pollutionLevel, true))
      .attr("rx", 4)
      .attr("ry", 4)
      .style("transition", "width 0.5s ease-in-out")
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        setCameraPosition({ activeMesh: normalText(d.name) });
      })
      .on("mouseover", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.8);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1);
      });

    // Add city names
    g.selectAll(".city-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "city-label")
      .attr("x", -10)
      .attr("y", d => (yScale(formatProvinceName(d.name)) || 0) + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .text(d => formatProvinceName(d.name));

    // Add values
    g.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", d => xScale(d.pollutionLevel) + 10)
      .attr("y", d => (yScale(formatProvinceName(d.name)) || 0) + yScale.bandwidth() / 2)
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .style("cursor", "pointer")
      .text(d => d.pollutionLevel.toLocaleString() + " µg/m³")
      .on("click", (_, d) => {
        setCameraPosition({ activeMesh: normalText(d.name) })
      });
    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .style("font-size", "12px");

  }, [data, width, height, title, setCameraPosition]);

  return (
    <div className="pollution-bar-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PollutionBarChart; 