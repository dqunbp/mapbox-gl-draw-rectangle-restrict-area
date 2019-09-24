import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from "mapbox-gl-draw-rectangle-restrict-area";
import defaultDrawThemes from "@mapbox/mapbox-gl-draw/src/lib/theme";

const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ],
      tileSize: 256
    }
  },
  layers: [
    {
      id: "osm",
      source: "osm",
      type: "raster"
    }
  ]
};

function updateDrawThemes(themes) {
  return defaultDrawThemes
    .filter(theme => !themes.map(({ id }) => id).includes(theme.id))
    .concat(themes);
}

export const drawStyles = updateDrawThemes([
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
        "#fbb03b",
        "#ff0000"
      ],
      "fill-opacity": 0.2
    }
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
        "#fbb03b",
        "#ff0000"
      ],
      "line-dasharray": [0.2, 2],
      "line-width": 2
    }
  }
]);

const map = new mapboxgl.Map({
  container: "map", // container id
  style: OSM_STYLE,
  center: [-91.874, 42.76], // starting position
  zoom: 12, // starting zoom
  modes: Object.assign(MapboxDraw.modes, {
    draw_polygon: DrawRectangle
  })
});

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  styles: drawStyles
});
map.addControl(draw);
document.getElementById("draw-rectangle").addEventListener("click", () => {
  console.log("let's draw!");
  draw.changeMode("draw_polygon", {
    areaLimit: 5, // km2
    allowCreateExceeded: false,
    exceedCallsOnEachMove: false, // true - calls exceedCallback on each mouse move
    exceedCallback: () => console.log("exceeded!")
  });
});
