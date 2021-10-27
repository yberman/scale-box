"use-strict";
function ScaleBox() {
  let scaleBox = {
    layers: new Map(),
  };

  const identityFunc = { slope: 1, intercept: 0 };
  const identityLayer = {
    xMin: 0,
    yMin: 0,
    xFwd: identityFunc,
    xInv: identityFunc,
    xMax: 1,
    yMax: 1,
    yFwd: identityFunc,
    yInv: identityFunc,
  };

  scaleBox.scale = (scaleName1, scaleName2)=>{
    const layer1 = scaleBox.layers.get(scaleName1) || identityLayer;
    const layer2 = scaleBox.layers.get(scaleName2) || identityLayer;
    // compose linear functions: layer1 Inverse with layer2 Forward
    const xSlope = layer2.xFwd.slope * layer1.xInv.slope;
    const xIntercept = layer2.xFwd.slope * layer1.xInv.intercept + layer2.xFwd.intercept;
    const ySlope = layer2.yFwd.slope * layer1.yInv.slope;
    const yIntercept = layer2.yFwd.slope * layer1.yInv.intercept + layer2.yFwd.intercept;
    return (point)=>({
        x: xSlope*point.x + xIntercept,
        y: ySlope*point.y + yIntercept
    });
  }

  // (0, 1) becomes (xMin, xMax)
  function linear(xMin, xMax) {
    const delta = xMax - xMin;
    return {slope: delta, intercept: xMin};
  }

  // (xMin, xMax) becomes (0, 1)
  function linearInverse(xMin, xMax) {
    const slope = 1 / (xMax - xMin);
    const xIntercept = - xMin / (xMax - xMin);
    return {slope: slope, intercept:xIntercept};
  }

  scaleBox.addLayer = (layerName, xMin, xMax, yMin, yMax) => {
    scaleBox.layers.set(layerName, {
      xMin: xMin,
      xMax: xMax,
      xFwd: linear(xMin, xMax),
      xInv: linearInverse(xMin, xMax),
      yMin: yMin,
      yMax: yMax,
      yFwd: linear(yMin, yMax),
      yInv: linearInverse(yMin, yMax),
    })
  }

  return scaleBox;
}
