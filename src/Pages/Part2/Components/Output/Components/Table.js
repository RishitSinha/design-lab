import React from "react";
import { Col, Row, Table as TableComponent } from "antd";
import { Subscribe } from "unstated";
import Part2Store from "../../../Store/Part2Store";

const Table = () => {
  return (
    <Subscribe to={[Part2Store]}>
      {({ state }) => (
        <div className="table">
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
