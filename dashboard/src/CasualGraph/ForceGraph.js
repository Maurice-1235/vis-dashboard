import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux'

import "./ForceGraph.css";
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
cytoscape.use( dagre );
export default function ForceGraph() {
  const data = useSelector(state => state.data.graph)
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
    setCy(_cy)
  }, [])

  useEffect(() => {
    
    const graph = async () => {
      if (!data) {
        return
      }
      const json = data;
      cy && cy.remove('node')
      cy && cy.remove('edge')
      for (let x = 0; x < json.nodes.length; x++) {
          cy.add({
            data: { id: json.nodes[x].id,
            label:json.nodes[x].name }
          })
      }
      for(let x = 0;x<json.links.length;x++){
        cy.add({
          data:{
            source:json.links[x].source,
            target:json.links[x].target
          }
        })
      }
      cy && cy.layout({
        name: 'circle'
    }).run();
    };
    graph()  
  },[data])

  return <div id='cy' />;
}