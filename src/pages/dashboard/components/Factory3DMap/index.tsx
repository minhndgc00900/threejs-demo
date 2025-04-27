import DeckGL, { MapViewState, PickingInfo, ScatterplotLayer } from "deck.gl";
import { Map, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { MAPBOX_ACCESS_TOKEN } from "../../../../utils/constant";
import type { Factory } from "../../dashboard.type";
import { useCallback, useState } from "react";

interface Factory3DMapProps {
  factories: Factory[];
}

type BartStation = {
  name: string;
  entries: number;
  exits: number;
  coordinates: [longitude: number, latitude: number];
};

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 108.2772,
  latitude: 14.0583,
  zoom: 5,
  pitch: 45,
  bearing: 0,
};

const Factory3DMap: React.FC<Factory3DMapProps> = ({ factories }) => {
  const [
    viewState, 
    // setViewState
] = useState(INITIAL_VIEW_STATE);

  const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    console.log("viewState", viewState);
  }, []);

  const layers = [
    new ScatterplotLayer<Factory>({
      id: "scatterplot-layer",
      data: factories,
      getPosition: (d) => [d.longitude, d.latitude],
      getFillColor: () => [255, 99, 71],
      getRadius: 5000,
      pickable: true,
      onHover: (info) => {
        if (info.object) {
          console.log("Hovered Factory:", info.object);
        }
      },
    }),
  ];

  // Callback to populate the default tooltip with content
  const getTooltip = useCallback(({ object }: PickingInfo<BartStation>) => {
    return object
      ? {
          html: `<div>${object.name}</div>`,
          style: {
            backgroundColor: "white",
            color: "black",
            padding: "5px",
            borderRadius: "4px",
          },
        }
      : null;
  }, []);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
      controller={true}
      style={{ width: "100vw", height: "100vh" }}
      getTooltip={getTooltip}
    >
      <Map
        {...viewState}
        onMove={onMove}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={viewState}
        style={{ width: 1366, height: 768 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </DeckGL>
  );
};

export default Factory3DMap;
