import React, { useEffect } from "react";
import Configuration from "./Components/Configuration";
import withStore from "../../Components/Unstated/withStore";
import Part2Store from "./Store/Part2Store";
import Output from "./Components/Output";

const Part2 = ({ part2Store: { init } }) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="part2">
      <Configuration />
      <Output/>
    </div>
  );
};

export default withStore([Part2Store])(Part2);
