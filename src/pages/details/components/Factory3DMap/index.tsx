import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import { MapViewState, PickingInfo, ScenegraphLayer } from "deck.gl";
import { useCallback, useEffect, useState } from "react";
import {
  GeolocateControl,
  Map,
  useControl,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import { MAPBOX_ACCESS_TOKEN } from "../../../../utils/constant";
import { Factory } from "../../../dashboard/dashboard.type";

// import Tooltip from "../../../dashboard/components/Tooltip";

interface Factory3DMapProps {
  factory: Factory;
}

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 105.96495755780717,
  latitude: 21.054822146716912,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const DeckGLOverlay = (props: {
  layers: ScenegraphLayer[];
  effects: LightingEffect[];
  controller: boolean;
}) => {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
};

export const Factory3DMap: React.FC<Factory3DMapProps> = ({ factory }) => {
  console.log(2323, factory);
  
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<Factory> | null>(null);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    console.log("viewState", viewState);
  }, []);

  const sun = new SunLight({
    timestamp: Date.now(),
    color: [255, 255, 255],
    intensity: 1.0,
  });
  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1,
  });

  const lightingEffect = new LightingEffect({ sun, ambientLight });

  const createBuildingLayers = () => {
    return [factory].map(
      (building) => {
        return  new ScenegraphLayer({
          id: `building-layer-${building.id}`,
          data: [building],
          scenegraph: building.modelPath,
          getPosition: (d) => {
            console.log(222, d);
            
            return [d.longitude, d.latitude, 0]
          },
          getOrientation: [0, 0, 90],
          sizeScale: building.scale || 1,
          pickable: true,
          onClick: () => {
            console.log("Clicked building:", building.name);
            console.log("Clicked building:", building);
          },
          onHover: (info) => {
            if (info.object) {
              // setHoverInfo({
              // 	x: info.x,
              // 	y: info.y,
              // 	building: building,
              // });
            } else {
              setHoverInfo(null);
            }
          },
        })
      }
       
    );
  };

  // const layers = [
  //   new ColumnLayer<Factory>({
  //     id: "column-layer",
  //     data: [factory],
  //     diskResolution: 12,
  //     radius: 700,
  //     extruded: true,
  //     elevationScale: 50,
  //     getPosition: (d) => [d.longitude, d.latitude],
  //     getElevation: (d) => d.populationDensity,
  //     getFillColor: (d) => getColorByPollution(d.pollutionLevel) as [number, number, number],
  //     pickable: true,
  //     onHover: (info) => {
  //       if (info.object) {
  //         setHoverInfo(info);
  //       } else {
  //         // Check if mouse is over the tooltip
  //         const tooltip = document.getElementById("custom-tooltip");
  //         if (!tooltip?.matches(":hover")) {
  //           setHoverInfo(null);
  //           setInitialPosition(null);
  //         }
  //       }
  //     },
  //   }),
  // ];

  useEffect(() => {
    if (hoverInfo && !initialPosition) {
      setInitialPosition({
        x: hoverInfo.x,
        y: hoverInfo.y,
      });
    }
  }, [hoverInfo, initialPosition]);

  return (
    <div className="section-container">
      {/* <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
        controller={true}
        style={{ width: '472px', height: '360px' }}
      > */}
      <Map
        onMove={onMove}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          ...INITIAL_VIEW_STATE,
          latitude: factory.latitude,
          longitude: factory.longitude,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onLoad={(event) => {
          const map = event.target;
          map.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          });
        }}
      >
        <DeckGLOverlay
          layers={createBuildingLayers()}
          effects={[lightingEffect]}
          controller
        />
        <GeolocateControl position="top-right" />
      </Map>
      {/* {hoverInfo?.object && (
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
      )} */}
      {/* </DeckGL> */}
    </div>
  );
};

export default Factory3DMap;
