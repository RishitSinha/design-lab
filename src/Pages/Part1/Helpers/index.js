const getDimensions = l => ({
  l,
  h: l / 15,
  b: l / 20
});

const getPanels = (vesselDimensions, panelSize) => ({
  l: Math.ceil(vesselDimensions.l / panelSize.l),
  h: Math.ceil(vesselDimensions.h / panelSize.h)
});

const getNodes = (vesselDimensions, panelSize) => ({
  l: Math.ceil(vesselDimensions.l / panelSize.l) + 1,
  h: Math.ceil(vesselDimensions.h / panelSize.h) + 1
});

const getPanelColumnIndex = (panels, testIndex) =>
  Math.floor((testIndex - 1) / panels.h);

export const compute = ({ l = 0, panelSize }, panelNumber) => {
  const vesselDimensions = getDimensions(l);

  const panels = getPanels(vesselDimensions, panelSize);

  const panelColumnIndex = getPanelColumnIndex(panels, panelNumber);

  return [
    panelNumber + panelColumnIndex,
    panelNumber + panelColumnIndex + 1,
    panelNumber + panels.h + panelColumnIndex + 2,
    panelNumber + panels.h + panelColumnIndex + 1
  ];
};

export const panelize = ({ l = 0, panelSize }) => {
  const vesselDimensions = getDimensions(l);

  const panels = getPanels(vesselDimensions, panelSize);

  console.log({ panels, vesselDimensions });

  const nodes = getNodes(vesselDimensions, panelSize);

  const xCoords = Array.from({ length: nodes.l }).map((_, i) => ({
    x: Math.pow(
      ((-1 * vesselDimensions.l) / 2 + i * panelSize.l) /
        (vesselDimensions.l / 2),
      2
    ),
    xx: (-1 * vesselDimensions.l) / 2 + i * panelSize.l
  }));

  const zCoords = Array.from({ length: nodes.h }).map((_, i) => ({
    z: Math.pow(Math.max(-1, (-1 * i * panelSize.h) / vesselDimensions.h), 2),
    zz: -1 * i * panelSize.h
  }));

  const xzCoords = xCoords
    .map(({ x, xx }) => zCoords.map(({ z, zz }) => ({ z, zz, x, xx })))
    .reduce((merged, current) => [...merged, ...current], []);

  const xyzCoords = xzCoords.map(({ x, xx, z, zz }) => ({
    x: xx.toFixed(2),
    y: (-1 * vesselDimensions.b * (1 - x) * (1 - z)).toFixed(2),
    z: zz.toFixed(2)
  }));

  return xyzCoords.map(({ x, y, z }, i) => [i + 1, x, y, z]);
};

export const download = ({ l = 0, panelSize }) => {
  const coords = panelize({ l, panelSize });

  const vesselDimensions = getDimensions(l);
  const panels = getPanels(vesselDimensions, panelSize);
  const nodes = getNodes(vesselDimensions, panelSize);

  const panelNodeData = Array.from({ length: panels.l * panels.h }).map(
    (_, i) => [i + 1, ...compute({ l, panelSize }, i + 1)]
  );

  arrayToCSV([
    [nodes.l * nodes.h],
    ...coords,
    [panels.l * panels.h],
    ...panelNodeData
  ]);
};

const arrayToCSV = twoDiArray => {
  let csvRows = [];
  for (let i = 0; i < twoDiArray.length; ++i) {
    for (let j = 0; j < twoDiArray[i].length; ++j) {
      twoDiArray[i][j] = '"' + twoDiArray[i][j] + '"';
    }
    csvRows.push(twoDiArray[i].join(","));
  }

  let csvString = csvRows.join("\r\n");
  let a = document.createElement("a");
  a.href = "data:attachment/csv," + csvString;
  a.target = "_blank";
  a.download = "data.csv";

  document.body.appendChild(a);
  a.click();
};
