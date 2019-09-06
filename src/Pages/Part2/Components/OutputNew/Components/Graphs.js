import React, { useRef } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { roundToPrecision } from "../../../../../Helpers/Misc";

const Graphs = ({ data }) => {
  const parent = useRef(null);
  return (
    <div className="graphs" style={{ margin: "0 10%" }} ref={parent}>
      <LineChart
        width={window.innerWidth * 0.75}
        height={(window.innerWidth * 0.75) / 1.75}
        data={generateChartData(data)}
      >
        <XAxis dataKey="w" />
        <YAxis />
        <Legend />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line connectNulls type="monotone" dataKey="sw" stroke="#8884d8" />
        <Line connectNulls type="monotone" dataKey="z" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Graphs;

const generateChartData = ({ wSteps, srw, z }) =>
  [
    ...wSteps.map((value, i) => ({
      w: parseFloat(value.toFixed(3)),
      sw: roundToPrecision(srw[i], 0.0001),
      z: roundToPrecision(z[i], 0.0001)
    }))
  ].sort((a, b) => a.w - b.w);
