export const getField = (parent, key = "") => {
  if (parent === undefined || typeof parent !== "object") {
    return null;
  }

  const fields = key.split(".");

  if (fields.length > 1) {
    return fields[0].slice(-1) === "]"
      ? parent[fields[0].slice(0, fields[0].length - 3)]
        ? getField(
            parent[fields[0].slice(0, fields[0].length - 3)][
              parseInt(
                fields[0].slice(fields[0].length - 2, fields[0].length - 1)
              )
            ],
            fields.slice(1).join(".")
          )
        : null
      : parent[fields[0]]
      ? getField(parent[fields[0]], fields.slice(1).join("."))
      : null;
  } else if (fields.length === 1) {
    return fields[0].slice(-1) === "]"
      ? parent[fields[0].slice(0, fields[0].length - 3)]
        ? parent[fields[0].slice(0, fields[0].length - 3)][
            parseInt(
              fields[0].slice(fields[0].length - 2, fields[0].length - 1)
            )
          ] || null
        : null
      : parent[fields[0]] !== undefined
      ? parent[fields[0]]
      : null;
  }
  return null;
};

export const roundToPrecision = (x, precision) => {
  let y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};
