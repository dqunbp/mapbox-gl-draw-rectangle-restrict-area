# mapbox-gl-draw-rectangle-restrict-area

> Draws rectangle, with optional area limitation

[![NPM](https://img.shields.io/npm/v/mapbox-gl-draw-rectangle-restrict-area.svg)](https://www.npmjs.com/package/mapbox-gl-draw-rectangle-restrict-area)

## Features

- One/two click drawing
- Mobile compabillity
- Area square restriction **Optional**

## Install

```bash
npm install --save @mapbox/mapbox-gl-draw mapbox-gl-draw-rectangle-restrict-area
```

## Usage

```js
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle, {
  DrawStyles,
} from "mapbox-gl-draw-rectangle-restrict-area";

const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-91.874, 42.76], // starting position
  zoom: 12, // starting zoom
  modes: Object.assign(MapboxDraw.modes, {
    draw_rectangle: DrawRectangle,
  }),
});

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  styles: DrawStyles,
});
map.addControl(draw);

// when mode drawing should be activated
draw.changeMode("draw_rectangle", {
  areaLimit: 5 * 1_000_000, // 5 km2, optional
  escapeKeyStopsDrawing: true, // default true
  allowCreateExceeded: false, // default false
  exceedCallsOnEachMove: false, // default false
  exceedCallback: (area) => console.log("exceeded!", area), // optional
  areaChangedCallback: (area) => console.log("updated", area), // optional
});
```

[Example](https://github.com/dqunbp/mapbox-gl-draw-rectangle-restrict-area/blob/master/example/index.js)

## License

MIT © [dqunbp](LICENSE)
