import React from "react";
import { Col, Row, Table as TableComponent } from "antd";
import { Subscribe } from "unstated";
import Part2Store from "../../../Store/Part2Store";

const Table = () => {
  return (
    <Subscribe to={[Part2Store]}>
      {({ state }) => (
        <div className="table">
          <Row gutter={32}>
            <Col span={12}>
              <TableComponent
                columns={tableColumns1}
                dataSource={generateTableDataStore1(state)}
                pagination={{ pageSize: 10 }}
              />
            </Col>
            <Col span={12}>
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

const generateTableDataStore1 = ({
  lambdaByL = [],
  lambda = [],
  timePeriod = [],
  w = [],
  config: { L }
}) => {
  const input = { lambdaByL, lambda, timePeriod, w };
  const maxLength = Object.keys(input).reduce(
    (max, current) => Math.max(max, input[current].length),
    0
  );
  return Array.from({ length: maxLength }).map((_, i) => {
    let obj = { L };
    Object.keys(input).forEach(key => (obj[key] = input[key][i]));
    return obj;
  });
};

const tableColumns1 = [
  {
    title: "λ/L",
    dataIndex: "lambdaByL",
    key: "lambdaByL"
  },
  {
    title: "L",
    dataIndex: "L",
    key: "L"
  },
  {
    title: "λ",
    dataIndex: "lambda",
    key: "lambda"
  },
  {
    title: "T",
    dataIndex: "timePeriod",
    key: "timePeriod"
  },
  {
    title: "W",
    dataIndex: "w",
    key: "w"
  }
];

const generateTableDataStore2 = ({
  wSteps = [],
  weSteps = [],
  sw = [],
  sew = []
}) => {
  const input = { wSteps, weSteps, sw, sew };
  const maxLength = Object.keys(input).reduce(
    (max, current) => Math.max(max, input[current].length),
    0
  );
  return Array.from({ length: maxLength }).map((_, i) => {
    let obj = {};
    Object.keys(input).forEach(key => (obj[key] = input[key][i]));
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
    title: "Se(w)",
    dataIndex: "sew",
    key: "sew"
  }
];
