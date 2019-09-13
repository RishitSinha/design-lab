import React, { useState } from "react";
import { Card, Col, Row, Switch } from "antd";
import Graphs from "./Components/Graphs";
import Table from "./Components/Table";

const OutputRAO5 = () => {
  const [showGraphs, toggleGraphs] = useState(false);
  return (
    <div className="output" style={{ marginTop: 32 }}>
      <Row>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={20}>
                <h2>Results: RAO5</h2>
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
            <Row>{showGraphs ? <Graphs /> : <Table />}</Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputRAO5;
