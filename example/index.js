import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle, {
  DrawStyles,
} from "mapbox-gl-draw-rectangle-restrict-area";

const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm",
      source: "osm",
      type: "raster",
    },
  ],
};

const map = new mapboxgl.Map({
  container: "map", // container id
  style: OSM_STYLE,
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

const currenArea = document.getElementById("area");
currenArea.textContent = "0";

function onAreaChanged(area) {
  currenArea.textContent = `${(area / 1_000_000).toFixed(2)}`;
}

document.getElementById("draw-rectangle").addEventListener("click", () => {
  console.log("let's draw!");
  draw.changeMode("draw_rectangle", {
    areaLimit: 5 * 1_000_000, // 5 km2, optional
    escapeKeyStopsDrawing: true, // default true
    allowCreateExceeded: false, // default false
    exceedCallsOnEachMove: false, // default false - calls exceedCallback on each mouse move
    exceedCallback: (area) => console.log(`area exceeded! ${area.toFixed(2)}`), // optional
    areaChangedCallback: onAreaChanged,
  });
});
