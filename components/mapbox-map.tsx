import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapCreated?(map: mapboxgl.Map): void;
  onMapLoaded?(map: mapboxgl.Map): void;
  onMapRemoved?(): void;
}

function MapboxMap({
  initialOptions = {},
  onMapCreated,
  onMapLoaded,
  onMapRemoved,
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
      ...initialOptions,
    });

    setMap(mapboxMap);
    if (onMapCreated) onMapCreated(mapboxMap);

    if (onMapLoaded) mapboxMap.once("load", () => onMapLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      if (onMapRemoved) onMapRemoved();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;
