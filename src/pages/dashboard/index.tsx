import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const Dashboard = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
  
    useEffect(() => {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      if (mapContainerRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
        });
      }
  
      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
        }
      }
    }, [])

  return (
    <div id='map-container' ref={mapContainerRef}/>
  )
}

export default Dashboard