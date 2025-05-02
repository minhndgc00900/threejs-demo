import DeckGL, { ColumnLayer, MapViewState, PickingInfo } from "deck.gl";
import { useCallback, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Map, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { MAPBOX_ACCESS_TOKEN } from "../../../../utils/constant";
import type { Factory } from "../../dashboard.type";
import { getColorByPollution } from "../../utils";
import Tooltip from "../Tooltip";

interface Factory3DMapProps {
  factories: Factory[];
}

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 105.96495755780717,
  latitude: 21.054822146716912,
  zoom: 9.207503944556365,
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
    new ColumnLayer<Factory>({
      id: "column-layer",
      data: factories,
      diskResolution: 12,
      radius: 700,
      extruded: true,
      elevationScale: 50,
      getPosition: (d) => [d.longitude, d.latitude],
      getElevation: (d) => d.populationDensity,
      getFillColor: (d) => getColorByPollution(d.pollutionLevel),
      pickable: true,
      onHover: (info) => {
        if (info.object) {
          console.log("Hovered:", info.object);
        }
      },
    }),
  ];

  // Callback to populate the default tooltip with content
  const getTooltip = useCallback(({ object }: PickingInfo<Factory>) => {
    if (!object) return null;

    return {
      html: renderToStaticMarkup(<Tooltip object={object} />),
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        color: "#333",
        padding: "8px",
        borderRadius: "6px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
        maxWidth: "290px",
      },
    };
  }, []);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
      controller={true}
      getTooltip={getTooltip}
    >
      <Map
        {...viewState}
        onMove={onMove}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={viewState}
        style={{ width: 1366, height: 768 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      />
    </DeckGL>
  );
};

export default Factory3DMap;
