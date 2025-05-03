import DeckGL, { ColumnLayer, MapViewState, PickingInfo } from "deck.gl";
import { useCallback, useState, useEffect } from "react";
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

export const Factory3DMap: React.FC<Factory3DMapProps> = ({ factories }) => {
  const [viewState] = useState(INITIAL_VIEW_STATE);
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<Factory> | null>(null);
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);

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
          setHoverInfo(info);
        } else {
          // Check if mouse is over the tooltip
          const tooltip = document.getElementById('custom-tooltip');
          if (!tooltip?.matches(':hover')) {
            setHoverInfo(null);
            setInitialPosition(null);
          }
        }
      },
    }),
  ];

  useEffect(() => {
    if (hoverInfo && !initialPosition) {
      setInitialPosition({
        x: hoverInfo.x,
        y: hoverInfo.y
      });
    }
  }, [hoverInfo, initialPosition]);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      layers={layers}
      controller={true}
    >
      <Map
        {...viewState}
        onMove={onMove}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={viewState}
        style={{ width: 1366, height: 768 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      />
      {hoverInfo?.object && (
        <div 
          id="custom-tooltip"
          style={{ 
            left: initialPosition?.x ?? hoverInfo.x, 
            top: initialPosition?.y ?? hoverInfo.y 
          }} 
          onMouseLeave={() => {
            setHoverInfo(null);
            setInitialPosition(null);
          }}
          className="absolute z-1 pointer-events-auto bg-[rgba(255,255,255,0.95)] text-[#333] shadow-[0px_2px_10px_rgba(0,0,0,0.15)] max-w-[290px] p-2 rounded-md"
        >
          <Tooltip object={hoverInfo.object} />
        </div>
      )}
    </DeckGL>
  );
};

export default Factory3DMap;
