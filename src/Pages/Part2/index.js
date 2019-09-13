import React, { useEffect } from "react";
import Configuration from "./Components/Configuration";
import withStore from "../../Components/Unstated/withStore";
import RAO3Store from "./Store/RAO3Store";
import Output from "./Components/Output";
import RAO5Store from "./Store/RAO5Store";
import OutputRAO5 from "./Components/OutputRAO5";
import OutputNew from "./Components/OutputNew";
import { Tabs } from "antd";
import { Sticky, StickyContainer } from "react-sticky";
import OutputSlamming from "./Components/OutputSlamming";

const { TabPane } = Tabs;

const Part2 = ({
  rAO3Store: { init: initRAO3 },
  rAO5Store: { init: initRAO5 }
}) => {
  useEffect(() => {
    initRAO3();
    initRAO5();
  }, [initRAO3, initRAO5]);

  return (
    <div className="part2">
      <Configuration />
      <StickyContainer>
        <Tabs style={{ marginTop: 32 }} renderTabBar={renderTabBar}>
          <TabPane tab={"Output RAO3"} key={"tab" + 1}>
            <Output />
          </TabPane>
          <TabPane tab={"Output RAO5"} key={"tab" + 2}>
            <OutputRAO5 />
          </TabPane>
          <TabPane tab={"Deck Wetness"} key={"tab" + 3}>
            <OutputNew />
          </TabPane>
          <TabPane tab={"Slamming"} key={"tab" + 4}>
            <OutputSlamming />
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  );
};

export default withStore([RAO3Store, RAO5Store])(Part2);

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{ ...style, zIndex: 1, background: "#fff" }}
      />
    )}
  </Sticky>
);
