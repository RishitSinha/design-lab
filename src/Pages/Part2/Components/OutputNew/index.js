import React, { useEffect, useState } from "react";
import withStore from "../../../../Components/Unstated/withStore";
import RAO3Store from "../../Store/RAO3Store";
import RAO5Store from "../../Store/RAO5Store";
import { roundToPrecision } from "../../../../Helpers/Misc";
import { Card, Col, InputNumber, Row } from "antd";
import Graphs from "./Components/Graphs";

const OutputNew = ({
  rAO3Store: { state: rao3 },
  rAO5Store: { state: rao5 }
}) => {
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
    const freeboard = 5;

    const {
      config: { L }
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
      area(rao3.sw, z),
      area(rao3.sw, z.map((val, i) => val * rao3.wSteps[i] * rao3.wSteps[i]))
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
    const n1hour = (3600 * prob) / Tz;

    console.log({ prob, n1hour });
    updateProb({ prob, n1hour });
  }, [rao3, rao5]);

  return (
    <div className="outputNew">
      <Card>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>m0z: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={m0z}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>m2z: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={m2z}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>Tz: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={tz}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>H1By3z: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={h1By3z}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>Prob: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={prob.prob}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" style={{ marginTop: 8 }}>
          <Col span={6}>
            <h3>N1Hour: </h3>
          </Col>
          <Col span={18}>
            <InputNumber
              contentEditable={false}
              value={prob.n1hour}
              style={{ width: "100%", pointerEvents: "none" }}
            />
          </Col>
        </Row>
      </Card>

      <Graphs
        data={{
          wSteps: rao3.wSteps,
          srw: tableData.srw_vbm.map(val => Math.abs(val)),
          z: z.map(val => Math.abs(val))
        }}
      />
    </div>
  );
};

export default withStore([RAO3Store, RAO5Store])(OutputNew);
