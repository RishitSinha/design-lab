import React, { useRef } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Subscribe } from "unstated";
import Part2Store from "../../../Store/Part2Store";

const Graphs = () => {
  const parent = useRef(null);
  return (
    <Subscribe to={[Part2Store]}>
      {({ state }) => (
        <div className="graphs" style={{ margin: "0 10%" }} ref={parent}>
          <LineChart
            width={window.innerWidth * 0.75}
            height={(window.innerWidth * 0.75) / 1.75}
            data={generateChartData(state)}
          >
            <XAxis dataKey="w" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line connectNulls type="monotone" dataKey="sw" stroke="#8884d8" />
            <Line connectNulls type="monotone" dataKey="sew" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </Subscribe>
  );
};

export default Graphs;

const generateChartData = ({ wSteps, weSteps, sw, sew }) =>
  [
    ...wSteps.map((value, i) => ({ w: value.toFixed(3), sw: sw[i] })),
    ...weSteps.map((value, i) => ({ w: value.toFixed(3), sew: sew[i] }))
  ].sort((a, b) => a.w - b.w);
