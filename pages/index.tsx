import * as React from "react";
import MapboxMap from "../components/mapbox-map";
import MapLoadingHolder from "../components/map-loading-holder";

function App() {
  const [loading, setLoading] = React.useState(true);
  const handleMapLoading = () => setLoading(false);

  return (
    <div className="app-container">
      <div className="map-wrapper">
        <MapboxMap
          initialOptions={{ center: [38.0983, 55.7038] }}
          onMapLoaded={handleMapLoading}
        />
      </div>
      {loading && <MapLoadingHolder className="loading-holder" />}
    </div>
  );
}

export default App;
