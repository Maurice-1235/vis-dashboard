// import * as d3 from "d3";

// export function runForceGraph(container, linksData, nodesData) {
//   //Get relation
//   const links = linksData.map((d) => Object.assign({}, d));
//   const nodes = nodesData.map((d) => Object.assign({}, d));
//   //Get DOM
//   const containerRect = container.getBoundingClientRect();
//   const height = containerRect.height;
//   const width = containerRect.width;

//   const color = () => {
//     return "#000000";
//   };
//   const drag = (simulation) => {
//     const dragstarted = (d) => {
//       if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     };

//     const dragged = (d) => {
//       d.fx = d3.event.x;
//       d.fy = d3.event.y;
//     };

//     const dragended = (d) => {
//       if (!d3.event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     };

//     return d3
//       .drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
//   };

//   const simulation = d3
//     .forceSimulation(nodes)
//     .force(
//       "link",
//       d3.forceLink(links).id((d) => d.id)
//     )
//     .force("charge", d3.forceManyBody().strength(-150))
//     .force("x", d3.forceX())
//     .force("y", d3.forceY());

//   const svg = d3
//     .select(container)
//     .append("svg")
//     .attr("viewBox", [-width / 2, -height / 2, width, height])
//     .call(
//       d3.zoom().on("zoom", () => {
//         svg.attr("transform", d3.event.transform);
//       })
//     );

//   const link = svg
//     .append("g")
//     .attr("stroke", "#999")
//     .attr("stroke-opacity", 0.6)
//     .attr("marker-end", "url(#arrow)")
//     .selectAll("line")
//     .data(links)
//     .enter()
//     .append("line")
//     .attr("stroke-width", (d) => d.value);

//   // .append('path')
//   // .attr('d', d3.line()(arrowPoints))
//   // .attr('stroke', 'black');

//   const node = svg
//     .append("g")
//     .attr("stroke", "#fff")

//     .attr("stroke-width", 1)
//     .selectAll("circle")
//     .data(nodes)
//     .enter()
//     .append("circle")
//     .attr("r", 16)
//     .attr("fill", color)
//     .call(drag(simulation));

//   const label = svg
//     .append("g")
//     .attr("class", "labels")
//     .selectAll("text")
//     .data(nodes)
//     .enter()
//     .append("text")
//     .attr("text-anchor", "start")
//     .attr("dominant-baseline", "central")
//     .text((d) => {
//       return d.name;
//     })

//     .call(drag(simulation));

//   simulation.on("tick", () => {
//     //update link positions
//     link
//       .attr("x1", (d) => d.source.x)
//       .attr("y1", (d) => d.source.y)
//       .attr("x2", (d) => d.target.x)
//       .attr("y2", (d) => d.target.y);

//     // update node positions
//     node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

//     // update label positions
//     label
//       .attr("x", (d) => {
//         return d.x;
//       })
//       .attr("y", (d) => {
//         return d.y;
//       });
//   });

//   return {
//     destroy: () => {
//       simulation.stop();
//     },
//     nodes: () => {
//       return svg.node();
//     },
//   };
// }
