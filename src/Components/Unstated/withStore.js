import React from "react";
import { Subscribe } from "unstated";
import { getField } from "../../Helpers/Misc";

const withStore = (containers, extractor) => WrappedComponent => props => (
  <Subscribe to={containers}>
    {(...containers) => (
      <WrappedComponent {...mapContainers(containers, extractor)} {...props} />
    )}
  </Subscribe>
);

const mapContainers = (containers, extractor = []) =>
  containers.reduce((obj, item, index) => {
    const name = item.name.charAt(0).toLowerCase() + item.name.slice(1);
    obj[name] = extractor[index] ? parseProps(item, extractor[index]) : item;
    return obj;
  }, {});

const parseProps = (item, extractor = []) =>
  extractor
    .map(key => ({
      [key.split(".").slice(-1)[0]]: getField(item, key)
    }))
    .reduce((merged, current) => ({ ...merged, ...current }));

export default withStore;
