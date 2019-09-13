import React, { useEffect, useState } from "react";
import withStore from "../../../../Components/Unstated/withStore";
import RAO3Store from "../../Store/RAO3Store";
import RAO5Store from "../../Store/RAO5Store";
import { Card, Col, Input, InputNumber, Row } from "antd";

const OutputSlamming = ({
  rAO3Store: { state: rao3 },
  rAO5Store: { state: rao5 }
}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    console.log({ rao3, rao5 });
    console.clear();

    const {
      config: { L, t: T }
    } = rao3;
    const xp = L / 2 - 1;
    const vo = 1;
    // const vo = 3.6576 * Math.sqrt(L / 167);

    const vbm = xp => ({
      sew_vbm: rao3.sew.map((value, i) => value - xp * rao5.sew[i] || 0),
      rao_vbm: rao3.rao.map((value, i) => value - xp * rao5.rao[i] || 0),
      srw_vbm: rao3.srw.map((value, i) => value - xp * rao5.srw[i] || 0)
    });

    const { sew_vbm, rao_vbm, srw_vbm } = vbm(xp);

    console.log({ srw_vbm });

    const z = srw_vbm.map((val, i) => val - rao3.sew[i] || 0);

    const [m0s, m2s] = [
      area(rao3.wSteps, z),
      area(
        rao3.wSteps,
        z.map((val, i) => val * rao3.wSteps[i] * rao3.wSteps[i])
      )
    ];

    console.log({ m0s, m2s });

    const Ts = 2 * Math.PI * Math.sqrt(m0s / m2s);
    // const T = 3;
    const H1By3s = 4 * Math.sqrt(m0s);

    const prob1 = Math.exp((-1 * Math.pow(T, 2)) / (2 * m0s));
    const prob2 = Math.exp((-1 * Math.pow(vo, 2)) / (2 * m2s));

    const prob = prob1 * prob2;

    const n = 3600 * (1 / (2 * Math.PI)) * Math.sqrt(m2s / m0s) * prob;

    console.log({ prob1, prob2, prob, n });
    setData({ prob, n });
  }, [rao3, rao5]);

  return (
    <div className="outputSlamming">
      <Card>
        <Row gutter={16}>
          <Col span={20}>
            <h2>Results: Slamming</h2>
            <Row style={{ marginBottom: 8 }}>
              <Col span={24}>
                <Card>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Probability: </h3>
                    </Col>
                    <Col span={18}>
                      <Input
                        contentEditable={false}
                        value={`${(data.prob * 100).toFixed(2)}%`}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Number: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={data.n}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default withStore([RAO3Store, RAO5Store])(OutputSlamming);

// const area = (curve, ref) => {
//   const area = curve.reduce((sum, current, index, self) => {
//     const x1 = roundToPrecision(current || 0, 0.0001);
//     const x2 = roundToPrecision(self[index + 1] || 0, 0.0001);
//     const y = ref[index + 1] - ref[index];
//     return index !== self.length - 1 ? sum + ((x1 + x2) * y) / 2 : sum;
//   }, 0);
//
//   return Math.abs(parseFloat(roundToPrecision(area, 0.0001).toFixed(4)));
// };

const area = (x, y) => {
  let area = 0;
  Array.from({ length: x.length }).forEach((_, i) => {
    if (i) {
      area += Math.abs(0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]));
    }
  });
  return area;
};
