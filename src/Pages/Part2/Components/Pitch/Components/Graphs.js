import React, { useRef } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { Subscribe } from "unstated";
import { roundToPrecision } from "../../../../../Helpers/Misc";
import RAO5Store from "../../../Store/RAO5Store";

const Graphs = () => {
  const parent = useRef(null);
  return (
    <Subscribe to={[RAO5Store]}>
      {({ state }) => {
        return (
          <div className="graphs" style={{ margin: "0 10%" }} ref={parent}>
            <LineChart
              width={window.innerWidth * 0.75}
              height={(window.innerWidth * 0.75) / 1.75}
              data={generateChartData(state)}
            >
              <XAxis dataKey="w" />
              <YAxis />
              <Legend />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                connectNulls
                type="monotone"
                dataKey="sw"
                stroke="#8884d8"
              />
              <Line
                connectNulls
                type="monotone"
                dataKey="sew"
                stroke="#82ca9d"
              />
            </LineChart>
            <LineChart
              width={window.innerWidth * 0.75}
              height={(window.innerWidth * 0.75) / 1.75}
              data={generateChartData(state)}
            >
              <XAxis dataKey="w" />
              <YAxis />
              {/*<Tooltip />*/}
              <Legend />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                connectNulls
                type="monotone"
                dataKey="srw"
                stroke="#c94d47"
              />
            </LineChart>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Graphs;

const generateChartData = ({ wSteps, weSteps, sw, sew, srw }) =>
  [
    ...wSteps.map((value, i) => ({
      w: value.toFixed(3),
      sw: roundToPrecision(sw[i], 0.0001)
    })),
    ...weSteps.map((value, i) => ({
      w: value.toFixed(3),
      sew: roundToPrecision(sew[i], 0.0001),
      srw: roundToPrecision(srw[i], 0.0001)
    }))
  ].sort((a, b) => a.w - b.w);
