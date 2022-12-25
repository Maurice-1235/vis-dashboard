import React from "react";
import { runForceGraph } from "./ForceGraphGenerator";
import { useRef,useEffect } from "react";
import styles from "./ForceGraph.module.css";

export function ForceGraph({ linksData, nodesData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData);
      destroyFn = destroy;
    }

    return destroyFn;
  }, [linksData, nodesData]);

  return <div ref={containerRef} className={styles.container} />;
}
