import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight,
} from "@deck.gl/core";
import { MapViewState, PickingInfo, ScenegraphLayer } from "deck.gl";
import { useCallback, useEffect, useState } from "react";
import {
  GeolocateControl,
  Map,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import { MAPBOX_ACCESS_TOKEN } from "../../../../utils/constant";
import { Factory } from "../../../dashboard/dashboard.type";
import { DeckGLOverlay, getColorByPollution } from "../../../../utils/common";

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

export const Factory3DMap: React.FC<Factory3DMapProps> = ({ factory }) => {
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
          updateTriggers: {
            getColor: [building.pollutionLevel]
          },
          getColor: (d) => {
            return getColorByPollution(d.pollutionLevel) as [number, number, number];
            // return colors[d.pollutionLevel as keyof typeof colors] || colors.low;
          }
        })
      }
       
    );
  };

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
    </div>
  );
};

export default Factory3DMap;
