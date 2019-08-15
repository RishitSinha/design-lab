import React, { useEffect, useState } from "react";
import { compute, download, panelize } from "./Helpers";

const panelSize = {
  l: 5,
  h: 1
};

const Day1 = () => {
  const [l, setL] = useState(100);
  const [nodes, setNodes] = useState([]);
  const [testPanel, setTestPanel] = useState(1);

  useEffect(() => {
    panelize({ l, panelSize });
  }, [l]);

  useEffect(() => {
    const nodes = compute({ l, panelSize }, testPanel);
    setNodes(nodes);
  }, [l, testPanel]);

  return (
    <div className="day1">
      <h1>Day 1</h1>
      <div>
        <p>L: </p>
        <input
          type="number"
          value={l}
          onChange={e => setL(parseInt(e.target.value.trim()))}
        />
      </div>
      <div>
        <p>Test Panel Index: </p>{" "}
        <input
          type="number"
          value={testPanel}
          onChange={e => setTestPanel(parseInt(e.target.value.trim()))}
        />
      </div>

      <p>Nodes: {JSON.stringify(nodes)}</p>

      <button onClick={() => download({ l, panelSize })}>Download CSV</button>
    </div>
  );
};

export default Day1;
