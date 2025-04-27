import { useRef, useEffect, Suspense } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import './App.css'
import PageWrapper from './components/PageWrapper/PageWrapper';

function App() {


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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/",
      element: <PageWrapper />,
      children: [
        {
          path: 'dashboard',
          lazy: () => import('./pages/dashboard').then(module => ({
            Component: module.default
          })),
        },
        {
          path: 'visualisation',
          lazy: async () => {
            const module = await import('./pages/visualisation');
            return { Component: module.default };
          }
        },
      ],
    },
  ]);

  return (
    <>
      {/* <div id='map-container' ref={mapContainerRef}/> */}
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App