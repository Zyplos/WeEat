import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import MapSection from "./pages/Map/Map";
import ListView from "./pages/ListView/ListView";
import localforage from "localforage";
import SetupIndex from "./pages/Setup/SetupIndex";
import CategoriesPage from "./pages/Setup/Categories";
import DebugPage from "./pages/debug";
import TransportPage from "./pages/Setup/Transport";

export default function App() {
  localforage.config({
    name: "WeEat",
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SetupIndex />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/map/list-view" element={<ListView />} />
        <Route path="/preferences" element={<SetupIndex />} />
        <Route path="/preferences/categories" element={<CategoriesPage />} />
        <Route path="/preferences/transport" element={<TransportPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
