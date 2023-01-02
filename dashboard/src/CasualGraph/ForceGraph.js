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
            'background-color': '#11479e',
            label: 'data(label)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        }
      ],

      elements: [

      ]
    });
    // console.log(elements.nodes);
    // let selected = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92]
    const graph = async () => {
    //   const response = await fetch("http://127.0.0.1:5000/get_graph", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ selected_id: selected }),
    //   });
    //   const json = await response.json();
      // console.log("json", json);
      // console.log(json.nodes)

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