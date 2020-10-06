# mapbox-gl-draw-rectangle-restrict-area

Draws rectangle, with optional area limitation

## [DEMO](https://dqunbp.github.io/mapbox-gl-draw-rectangle-restrict-area/)

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
});

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  styles: DrawStyles,
  modes: Object.assign(MapboxDraw.modes, {
    draw_rectangle: DrawRectangle,
  }),
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

## Styles

### Exceeded features

Exeeded size feature has `user_size_exceed: true` property

### Default styles

`mapbox-gl-draw-rectangle-restrict-area` use [default mapbox-gl-draw styles](https://github.com/mapbox/mapbox-gl-draw/blob/master/src/lib/theme.js) with 2 overrided layers:

```js
[
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]], // turns to red if feature has `user_size_exceed: true` prop
        "#fbb03b",
        "#ff0000",
      ],
      "fill-opacity": 0.2,
    },
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
        "#fbb03b",
        "#ff0000",
      ],
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
];
```

You also can export it

```js
import { ActivePolygonStyles } from "mapbox-gl-draw-rectangle-restrict-area";
```

### Override styles

You can override default drawing styles with `overrideDefaultStyles` helper function

```js
import { overrideDefaultStyles } from "mapbox-gl-draw-rectangle-restrict-area";

const drawStyles = overrideDefaultStyles(<your_custom_styles>);
```

Default styles with same ids will be replaced.

## [Example](https://github.com/dqunbp/mapbox-gl-draw-rectangle-restrict-area/blob/master/example/index.js)

## License

MIT © [dqunbp](LICENSE)
