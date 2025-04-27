import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import './App.css'
import PageWrapper from './components/PageWrapper/PageWrapper';
import { Suspense } from "react";

function App() {

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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App