import * as React from "react";
import MapboxMap from "./mapbox-map";

const MapboxMapContext = React.createContext<mapboxgl.Map | undefined>(
  undefined
);

function useMapboxMap() {
  return React.useContext(MapboxMapContext);
}

const Sidebar: React.FC = () => {
  const mapboxMap = useMapboxMap();

  return <div>...some sidebar content...</div>;
};

const App: React.FC = () => {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  return (
    <div>
      <MapboxMap onLoaded={(mapboxMap) => setMap(mapboxMap)} />
      <MapboxMapContext.Provider value={map}>
        <Sidebar />
      </MapboxMapContext.Provider>
    </div>
  );
};

export default App;
