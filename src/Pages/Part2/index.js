import React, { useEffect } from "react";
import Configuration from "./Components/Configuration";
import withStore from "../../Components/Unstated/withStore";
import RAO3Store from "./Store/RAO3Store";
import Output from "./Components/Output";
import RAO5Store from "./Store/RAO5Store";
import OutputRAO5 from "./Components/OutputRAO5";

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
      <Output />
      <OutputRAO5 />
    </div>
  );
};

export default withStore([RAO3Store, RAO5Store])(Part2);
