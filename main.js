const row = 20,
  column = 30;

const margin = { top: 30, right: 10, bottom: 10, left: 10 };
let width = 900 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

const hexRadius = d3.min([
  width / ((column + 0.5) * Math.sqrt(3)),
  height / ((row + 1 / 3) * 1.5),
]);

width = column * hexRadius * Math.sqrt(3);
height = row * 1.5 * hexRadius + 0.5 * hexRadius;

const hexbin = d3.hexbin().radius(hexRadius);

const center = [];
for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    let x = hexRadius * j * Math.sqrt(3);
    if (i % 2 === 1) x += (hexRadius * Math.sqrt(3)) / 2;
    const y = hexRadius * i * 1.5;
    center.push([x, y]);
  }
}

const svg = d3
  .select('#automata')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

function Mousemove() {
  d3.select(this).transition().duration(10).style('fill-opacity', 0.3);
}

//Mouseout function
function Mouseout() {
  d3.select(this).transition().duration(1000).style('fill-opacity', 1);
}

svg
  .append('g')
  .selectAll('.hexagon')
  .data(hexbin(center))
  .enter()
  .append('path')
  .attr('class', 'hexagon')
  .attr('d', d => 'M' + d.x + ',' + d.y + hexbin.hexagon())
  .attr('stroke', '#fff')
  .attr('stroke-width', '1px')
  .style('fill', '#000')
  .on('mousemove', Mousemove)
  .on('mouseout', Mouseout);
