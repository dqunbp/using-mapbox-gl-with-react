import WorldIcon from "../components/world-icon";

function MapLoadingHolder({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <WorldIcon className="icon" />
      <h1>Initializing the map</h1>
      <div className="icon-attribute">
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default MapLoadingHolder;
