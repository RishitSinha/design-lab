import React from "react";
import { Card, Col, InputNumber, Row, Table as TableComponent } from "antd";

const Table = ({ data, m0z, m2z, tz, prob, h1By3z }) => {
  return (
    <div className="table">
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
      <Row>
        <Col span={24}>
          <TableComponent
            columns={tableColumns}
            dataSource={generateTableDataStore(data)}
            pagination={{ pageSize: 10 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Table;

const generateTableDataStore = ({
  wSteps = [],
  rao3 = [],
  rao5 = [],
  srw_vbm = [],
  z = []
}) => {
  const input = { wSteps, rao3, rao5, srw_vbm, z };
  const maxLength = Object.keys(input).reduce(
    (max, current) => Math.max(max, input[current].length),
    0
  );
  return Array.from({ length: maxLength }).map((_, i) => {
    let obj = {};
    Object.keys(input).forEach(
      key => (obj[key] = (input[key][i] || 0).toFixed(6))
    );
    return obj;
  });
};

const tableColumns = [
  {
    title: "w",
    dataIndex: "wSteps",
    key: "wSteps"
  },
  {
    title: "Heave Response Spectrum",
    dataIndex: "rao3",
    key: "rao3"
  },
  {
    title: "Pitch Response Spectrum",
    dataIndex: "rao5",
    key: "rao5"
  },
  {
    title: "Vertical Bow Motion Spectrum",
    dataIndex: "srw_vbm",
    key: "srw_vbm"
  },
  {
    title: "Deck Wetness Spectrum",
    dataIndex: "z",
    key: "z"
  }
];
