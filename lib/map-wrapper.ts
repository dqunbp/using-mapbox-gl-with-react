import mapboxgl from "mapbox-gl";

export class MapWrapper {
  private _map?: mapboxgl.Map;

  set map(instance: mapboxgl.Map) {
    this._map = instance;
  }

  get map() {
    if (typeof this._map === "undefined")
      throw new Error("Cannot access mapbox map before inilizing it");
    return this._map;
  }

  remove() {
    if (typeof this._map === "undefined")
      throw new Error("Cannot remove mapbox map before inilizing");
    this._map.remove();
    this._map = undefined;
  }

  create<T extends HTMLElement>(
    container: T,
    options: Omit<mapboxgl.MapboxOptions, "container">
  ) {
    const mapboxMap = new mapboxgl.Map({
      container,
      ...options,
    });

    this._map = mapboxMap;
  }
}

const wrapper = new MapWrapper();

export default wrapper;
