import React, { useCallback } from "react";
import { Button, Card, Col, InputNumber, Row } from "antd";
import { Subscribe } from "unstated";
import RAO3Store from "../Store/RAO3Store";
import { useDropzone } from "react-dropzone";
import withStore from "../../../Components/Unstated/withStore";
import RAO5Store from "../Store/RAO5Store";

const Configuration = ({
  rAO3Store: { readRaoInput: RAO3Input },
  rAO5Store: { readRaoInput: RAO5Input }
}) => {
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

        acceptedFiles[0].name.toLowerCase().includes("rao5")
          ? RAO5Input(data)
          : RAO3Input(data);
      };
      reader.readAsText(acceptedFiles[0]);
    },
    [RAO3Input, RAO5Input]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Subscribe to={[RAO3Store, RAO5Store]}>
      {(
        { state: { config }, updateConfig: u1, init: i1 },
        { updateConfig: u2, init: i2 }
      ) => {
        const init = args => {
          i1(args);
          i2(args);
        };
        const updateConfig = args => {
          u1(args);
          u2(args);
        };
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
                          <p>Click to upload RAO3 file</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={24}>
                      <div {...getRootProps()}>
                        <input style={{ width: "100%" }} {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>Click to upload RAO5 file</p>
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
                      <h3>f: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            f: value
                          })
                        }
                        value={config.f}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                  <Row type="flex" align="middle" style={{ marginTop: 8 }}>
                    <Col span={6}>
                      <h3>Draft: </h3>
                    </Col>
                    <Col span={18}>
                      <InputNumber
                        onChange={value =>
                          updateConfig({
                            ...config,
                            t: value
                          })
                        }
                        value={config.t}
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

export default withStore([RAO3Store, RAO5Store])(Configuration);
