import React from "react";
import { Button, Card, Col, InputNumber, Row } from "antd";
import { Subscribe } from "unstated";
import Part2Store from "../Store/Part2Store";

const Configuration = () => {
  return (
    <Subscribe to={[Part2Store]}>
      {({ state: { config }, updateConfig, init }) => {
        // console.log({ config });
        return (
          <div className="configuration">
            <Row>
              <Col span={12}>
                <h1>Configuration:</h1>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Card title={"λ/L"}>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Start: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        value={config.lambdaByL.start}
                        style={{ width: "100%" }}
                        onChange={value =>
                          updateConfig({
                            ...config,
                            lambdaByL: {
                              ...config.lambdaByL,
                              start: value
                            }
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Max: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        value={config.lambdaByL.max}
                        style={{ width: "100%" }}
                        onChange={value =>
                          updateConfig({
                            ...config,
                            lambdaByL: {
                              ...config.lambdaByL,
                              max: value
                            }
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>StepSize: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        value={config.lambdaByL.stepSize}
                        style={{ width: "100%" }}
                        onChange={value =>
                          updateConfig({
                            ...config,
                            lambdaByL: {
                              ...config.lambdaByL,
                              stepSize: value
                            }
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type={"primary"}
                      onClick={() => init()}
                      style={{ marginTop: 8 }}
                    >
                      Save
                    </Button>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title={"w"}>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Start: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        disabled
                        value={config.w.min}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Max: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        value={config.w.max}
                        style={{ width: "100%" }}
                        onChange={value =>
                          updateConfig({
                            ...config,
                            w: {
                              ...config.w,
                              max: value
                            }
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>StepSize: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        value={config.w.stepSize}
                        style={{ width: "100%" }}
                        onChange={value =>
                          updateConfig({
                            ...config,
                            w: {
                              ...config.w,
                              stepSize: value
                            }
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type={"primary"}
                      onClick={() => init()}
                      style={{ marginTop: 8 }}
                    >
                      Save
                    </Button>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>L: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            L: value
                          })
                        }
                        value={config.L}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Fn: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            Fn: value
                          })
                        }
                        value={config.Fn}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>g: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            g: value
                          })
                        }
                        value={config.g}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>b: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            b: value
                          })
                        }
                        value={config.b}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>T1: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            t1: value
                          })
                        }
                        value={config.t1}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>H1/3: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            h1By3: value
                          })
                        }
                        value={config.h1By3}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type={"primary"}
                      onClick={() => init()}
                      style={{ marginTop: 8 }}
                    >
                      Save
                    </Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Configuration;
