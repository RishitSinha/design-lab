import React, { useEffect, useState } from "react";
import withStore from "../../../../Components/Unstated/withStore";
import RAO3Store from "../../Store/RAO3Store";
import RAO5Store from "../../Store/RAO5Store";
import { roundToPrecision } from "../../../../Helpers/Misc";
import Graphs from "./Components/Graphs";
import Table from "./Components/Table";
import { Card, Col, Row, Switch } from "antd";

const OutputNew = ({
  rAO3Store: { state: rao3 },
  rAO5Store: { state: rao5 }
}) => {
  const [showGraphs, toggleGraphs] = useState(false);
  const [prob, updateProb] = useState({ prob: 0, n1hour: 0 });
  const [tz, updateTz] = useState(0);
  const [h1By3z, updateH1By3z] = useState(0);
  const [tableData, updateTableData] = useState({
    sew_vbm: [],
    rao_vbm: [],
    srw_vbm: []
  });
  const [m0z, updateM0z] = useState(0);
  const [m2z, updateM2z] = useState(0);
  const [z, updateZ] = useState([]);

  useEffect(() => {
    const {
      config: { L, f: freeboard }
    } = rao3;
    const xp = L / 2 - 1;

    const vbm = xp => ({
      sew_vbm: rao3.sew.map((value, i) => value - xp * rao5.sew[i] || 0),
      rao_vbm: rao3.rao.map((value, i) => value - xp * rao5.rao[i] || 0),
      srw_vbm: rao3.srw.map((value, i) => value - xp * rao5.srw[i] || 0)
    });

    const { sew_vbm, rao_vbm, srw_vbm } = vbm(xp);

    updateTableData({ sew_vbm, rao_vbm, srw_vbm });
    console.log({ sew_vbm, rao_vbm, srw_vbm });

    const area = (curve, ref) => {
      const area = curve.reduce((sum, current, index, self) => {
        const x1 = roundToPrecision(current || 0, 0.0001);
        const x2 = roundToPrecision(self[index + 1] || 0, 0.0001);
        const y = ref[index + 1] - ref[index];
        return index !== self.length - 1 ? sum + ((x1 + x2) * y) / 2 : sum;
      }, 0);

      return Math.abs(parseFloat(roundToPrecision(area, 0.0001).toFixed(4)));
    };

    const m0 = area(
      srw_vbm,
      rao3.weSteps.map((val, i) => (val + rao5.weSteps[i]) / 2)
    );

    const m2 = area(
      srw_vbm,
      rao3.weSteps.map((val, i) => Math.pow((val + rao5.weSteps[i]) / 2, 3) / 3)
    );

    const T = 2 * Math.PI * Math.sqrt(m0 / m2);
    const H1By3 = 4 * Math.sqrt(m0);
    console.log({ m0, m2, T, H1By3 });

    const z = srw_vbm.map((val, i) => val - rao3.sew[i] || 0);

    console.log({ z });
    updateZ(z);

    const [m0z, m2z] = [
      area(rao3.wSteps, z),
      area(
        rao3.wSteps,
        z.map((val, i) => val * rao3.wSteps[i] * rao3.wSteps[i])
      )
    ];

    console.log({ m0z, m2z });
    updateM0z(m0z);
    updateM2z(m2z);

    const Tz = 2 * Math.PI * Math.sqrt(m0z / m2z);
    const H1By3z = 4 * Math.sqrt(m0z);

    console.log({ Tz, H1By3z });
    updateTz(Tz);
    updateH1By3z(H1By3);

    const prob = Math.exp((-1 * freeboard) / (2 * m0z));
    const n1hour = Math.floor((3600 * prob) / Tz);

    console.log({ prob, n1hour });
    updateProb({ prob, n1hour });
  }, [rao3, rao5]);

  return (
    <div className="outputNew">
      <Row>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={20}>
                <h2>Results: Deck Wetness</h2>
              </Col>
              <Col span={2}>
                <h3 style={{ textAlign: "right" }}>View Mode</h3>
              </Col>
              <Col span={2}>
                <Switch
                  checkedChildren="Graphs"
                  unCheckedChildren="Table"
                  checked={showGraphs}
                  onChange={value => toggleGraphs(value)}
                />
              </Col>
            </Row>
            <Row>
              {showGraphs ? (
                <Graphs
                  data={{
                    wSteps: rao3.wSteps,
                    srw: tableData.srw_vbm.map(val => Math.abs(val)),
                    z: z.map(val => Math.abs(val))
                  }}
                />
              ) : (
                <Table
                  data={{
                    ...tableData,
                    rao3: rao3.rao,
                    rao5: rao5.rao,
                    z,
                    wSteps: rao3.wSteps
                  }}
                  m0z={m0z}
                  m2z={m2z}
                  tz={tz}
                  prob={prob}
                  h1By3z={h1By3z}
                />
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withStore([RAO3Store, RAO5Store])(OutputNew);
