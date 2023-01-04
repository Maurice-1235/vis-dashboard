import React, { useState } from "react";
// import { runForceGraph } from "./ForceGraphGenerator";
import { useRef,useEffect } from "react";
import "./ForceGraph.css";
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
cytoscape.use( dagre );
export let graphData=[]
export function ForceGraph(props) {
  const [cy, setCy] = useState(null)
  
  useEffect(() => {
    let _cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#8EA8BA',
            label: 'data(label)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#CCCCCC',
            'target-arrow-color': '#CCCCCC',
            'curve-style': 'bezier'
          }
        }
      ],

      elements: [

      ]
    });
    const graph = async () => {


      const json = props.data;
    
      for (let x = 0; x < json.nodes.length; x++) {
          _cy.add({
            data: { id: json.nodes[x].id,
            label:json.nodes[x].name }
          })
          graphData[json.nodes[x].id] = json.nodes[x].name
      }
      console.log(graphData,graphData.length)
      for(let x = 0;x<json.links.length;x++){
        _cy.add({
          data:{
            source:json.links[x].source,
            target:json.links[x].target
          }
        })
      }
      _cy.layout({
        name: 'circle'
    }).run();
    };
    graph()
   
    setCy(_cy)
    
    
  },[])

  return <div id='cy' />;
}
// export function getGraphData(){
//   console.log("get value",global.graphData.connection)
//   return global.graphData.connection
// }