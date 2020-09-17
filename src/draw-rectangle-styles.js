import { drawThemes } from "./lib";

const ActivePolygonStyles = [
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
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

function overrideDefaultStyles(themes) {
  return drawThemes
    .filter((theme) => !themes.map(({ id }) => id).includes(theme.id))
    .concat(themes);
}

const overrided = overrideDefaultStyles(ActivePolygonStyles);

export { overrided as default, overrideDefaultStyles, ActivePolygonStyles };
