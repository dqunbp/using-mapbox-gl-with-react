import * as React from "react";
import mapbox from "../lib/map-wrapper";
import "mapbox-gl/dist/mapbox-gl.css";

const onNodeCreated = <T extends HTMLElement>(node: T | null) => {
  if (node === null) return;

  mapbox.create(node, {
    style: "mapbox://styles/mapbox/streets-v11",
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    zoom: 9,
    center: [-74.5, 40],
  });
};

const WithOutsideMap: React.FC = () => {
  const [[lat, lng], setCenter] = React.useState(["-74.5", "40"]);
  const [zoom, setZoom] = React.useState("9");

  const onNodeCreated = React.useCallback(
    <T extends HTMLElement>(node: T | null) => {
      if (node === null) return;

      mapbox.create(node, {
        style: "mapbox://styles/mapbox/streets-v11",
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        zoom: +zoom,
        center: [+lat, +lng],
      });

      mapbox.map.on("move", () => {
        setCenter([
          mapbox.map.getCenter().lng.toFixed(4),
          mapbox.map.getCenter().lat.toFixed(4),
        ]);
        setZoom(mapbox.map.getZoom().toFixed(2));
      });
    },
    []
  );

  return (
    <div className="app-container">
      <div className="map-wrapper">
        <div className="viewport-panel">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div
          ref={onNodeCreated}
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default WithOutsideMap;
