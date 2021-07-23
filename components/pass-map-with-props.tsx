import * as React from "react";
import MapboxMap from "./mapbox-map";

export const Sidebar: React.FC<{ map: mapboxgl.Map | undefined }> = ({
  map,
}) => {
  return <div>...some sidebar content...</div>;
};

const App: React.FC = () => {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  return (
    <div>
      <MapboxMap onLoaded={setMap} />
      <Sidebar map={map} />
    </div>
  );
};

export default App;
