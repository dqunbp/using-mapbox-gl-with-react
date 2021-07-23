import * as React from "react";
import Head from "next/head";
import MapboxMap from "../components/mapbox-map";
import MapLoadingHolder from "../components/map-loading-holder";

function App() {
  const [loading, setLoading] = React.useState(true);
  const handleMapLoading = () => setLoading(false);

  return (
    <>
      <Head>
        <title>Using mapbox-gl with React and Next.js</title>
        <meta
          property="og:title"
          content="Using mapbox-gl with React and Next.js"
        />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Using%20**mapbox-gl**%20with%20React%20and%20**Next.js**.png?theme=light&md=1&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&images=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F1f%2FMapbox_logo_2019.svg%2F1024px-Mapbox_logo_2019.svg.png&widths=350&widths=auto&heights=undefined&heights=100"
        />
      </Head>
      <div className="app-container">
        <div className="map-wrapper">
          <MapboxMap
            initialOptions={{ center: [38.0983, 55.7038] }}
            onLoaded={handleMapLoading}
          />
        </div>
        {loading && <MapLoadingHolder className="loading-holder" />}
      </div>
    </>
  );
}

export default App;
