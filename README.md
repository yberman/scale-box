# scale-box
JS object for scaling boxes

When you have an image that has multiple meainingful coordinates over it this provides an easy way to switch coordinate systems. 

From the [example](./example.html), we have coordinates for the canvas, the canvas without borders (which has the y coordinates inverted) and to coordinate system for the underlying graph. It also has a scale for sampling 1 through `nSamples`.

```javascript
scaleBox.addLayer("canvas", 0, plot.width, 0, plot.height);
scaleBox.addLayer("canvas-no-border", 15, plot.width-15, plot.height-15, 15);
scaleBox.addLayer("coordinates", -12, 12, -4, 4);
scaleBox.addLayer("samples", 0, nSamples, 0, 1); // y-coordinates don't matter for sampling
```

we can then use the scalebox object to change which coordinates we're working in.

```javascript
let toX = i=>scaleBox.scale("samples", "coordinates")({x:i}).x;
let toPixel = scaleBox.scale("coordinates", "canvas-no-border");
for(let i = 0; i < nSamples; i++) {
  let x = toX(i)
  let px = toPixel({x: x, y: g(x)});
```
