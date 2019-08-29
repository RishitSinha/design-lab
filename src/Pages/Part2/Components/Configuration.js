import React, { useCallback } from "react";
import { Button, Card, Col, InputNumber, Row } from "antd";
import { Subscribe } from "unstated";
import Part2Store from "../Store/Part2Store";
import { useDropzone } from "react-dropzone";
import withStore from "../../../Components/Unstated/withStore";

const Configuration = ({ part2Store: { readRaoInput } }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      console.log({ acceptedFiles });

      const reader = new FileReader();
      reader.onload = function(progressEvent) {
        let lines = this.result.split("\n");

        const data = [];
        for (let line = 0; line < lines.length; line++) {
          if (lines[line]) {
            const [w, rao] = lines[line]
              .split(" ")
              .filter(value => value)
              .map(value => parseFloat(value));
            data.push({ w, rao });
          }
        }
        readRaoInput(data);
      };
      reader.readAsText(acceptedFiles[0]);
    },
    [readRaoInput]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Subscribe to={[Part2Store]}>
      {({ state: { config }, updateConfig, init }) => {
        return (
          <div className="configuration">
            <Row>
              <Col span={12}>
                <h1>Configuration:</h1>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Card title={"RAO"}>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={24}>
                      <div {...getRootProps()}>
                        <input style={{ width: "100%" }} {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>Click to upload RAO file</p>
                        )}
                      </div>
                    </Col>
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

export default withStore([Part2Store])(Configuration);
