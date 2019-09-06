import React from "react";
import { Card, Col, InputNumber, Row, Table as TableComponent } from "antd";
import { Subscribe } from "unstated";
import RAO3Store from "../../../Store/RAO3Store";

const Table = () => {
  return (
    <Subscribe to={[RAO3Store]}>
      {({ state, init }) => (
        <div className="table">
          <div className="moments">
            <Row style={{ marginBottom: 8 }}>
              <Col span={24}>
                <Card>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Area S(w): </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={state.moments.sw}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Area Se(we): </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={state.moments.sew}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Area Sr(we): </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={state.moments.srw}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>m2: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={state.moments.m2}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Computed T: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={
                          2 *
                          Math.PI *
                          Math.sqrt(state.moments.sw / state.moments.m2)
                        }
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Computed H1/3: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        contentEditable={false}
                        value={4 * Math.sqrt(state.moments.sw)}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={24}>
              <TableComponent
                columns={tableColumns2}
                dataSource={generateTableDataStore2(state)}
                pagination={{ pageSize: 10 }}
              />
            </Col>
          </Row>
        </div>
      )}
    </Subscribe>
  );
};

export default Table;

const generateTableDataStore2 = ({
  wSteps = [],
  weSteps = [],
  sw = [],
  sew = [],
  rao = [],
  srw = []
}) => {
  const input = { wSteps, weSteps, sw, sew, rao, srw };
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

const tableColumns2 = [
  {
    title: "w",
    dataIndex: "wSteps",
    key: "wSteps"
  },
  {
    title: "S(w)",
    dataIndex: "sw",
    key: "sw"
  },
  {
    title: "we",
    dataIndex: "weSteps",
    key: "weSteps"
  },
  {
    title: "Se(we)",
    dataIndex: "sew",
    key: "sew"
  },
  {
    title: "Rao",
    dataIndex: "rao",
    key: "rao"
  },
  {
    title: "Sr(we)",
    dataIndex: "srw",
    key: "srw"
  }
];
