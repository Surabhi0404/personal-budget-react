import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from "axios";


function ChartD3J(props) {
  const [data, setData] = useState({});
    useEffect(()=>{
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:3000/budget',
            );
            setData(result.data.myBudget);
        };
        fetchData();
    }, []);

  const {
    outerRadius,
    innerRadius,
  } = props;

  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', '#A3E4D7', '#F1C40F', '#1B4F72']);

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    d3.select('#pie-container')
      .select('svg')
      .remove();

    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.budget);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.title)
      .style('font-size', 12)
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }    

  return <div id="pie-container" />;
}

export default ChartD3J;