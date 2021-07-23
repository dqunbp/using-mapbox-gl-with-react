import * as React from "react";
import { useActor } from "@xstate/react";
import { interpret, State } from "xstate";
import { assign, createMachine } from "xstate";
import { inspect } from "@xstate/inspect";
import mapbox from "../lib/map-wrapper";
import "mapbox-gl/dist/mapbox-gl.css";

const onNodeCreated = <T extends HTMLElement>(node: T | null) => {
  if (node === null) return;

  const { zoom, center } = mapService.state.context;
  const [lng, lat] = center;

  mapbox.create(node, {
    style: "mapbox://styles/mapbox/streets-v11",
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    zoom: +zoom,
    center: [+lng, +lat],
  });
  mapbox.map.once("load", () => {
    mapService.send({ type: "LOAD" });
  });
  mapbox.map.on("move", () => {
    mapService.send({
      type: "MOVE",
      center: [
        mapbox.map.getCenter().lng.toFixed(4),
        mapbox.map.getCenter().lat.toFixed(4),
      ],
      zoom: mapbox.map.getZoom().toFixed(2),
    });
  });
};

interface Context {
  zoom: string;
  center: [string, string];
}

type Event =
  | { type: "LOAD" }
  | { type: "MOVE"; zoom: string; center: [string, string] };

const mapMachine = createMachine<Context, Event>(
  {
    id: "map",
    initial: "loading",
    context: {
      zoom: "9",
      center: ["-74.5", "40"],
    },
    states: {
      loading: {
        on: {
          LOAD: "idle",
        },
      },
      idle: {
        on: {
          MOVE: {
            actions: [
              assign((_ctx, event) => ({
                center: event.center,
                zoom: event.zoom,
              })),
              "persist",
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      persist: () => {
        localStorage.setItem("state", JSON.stringify(mapService.state.context));
      },
    },
  }
);

const mapService = interpret(mapMachine, { devTools: true });

if (typeof window !== "undefined") {
  inspect({
    iframe: false,
  });

  const ctx = localStorage.getItem("state");

  const nextContext = ctx
    ? (JSON.parse(ctx) as Context)
    : mapMachine.initialState.context;

  mapService.start(State.from(mapMachine.initialState, nextContext));
}

const WithOutsideMap: React.FC = () => {
  const [{ context }] = useActor(mapService);

  const [lng, lat] = context.center;
  const zoom = context.zoom;

  React.useLayoutEffect(() => {
    return () => {
      mapbox.remove();
    };
  }, []);

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
