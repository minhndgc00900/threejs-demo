import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_ACCESS_TOKEN } from "../../utils/constant";
import Factory3DMap from "./components/Factory3DMap";
import { mockFactories } from "./constants";

const Dashboard = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* <div className="absolute h-[calc(100vh-64px)]" id="map-container" ref={mapContainerRef} /> */}
      <Factory3DMap factories={mockFactories} />
    </div>
  );
};

export default Dashboard;
