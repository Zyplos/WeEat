import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import localforage from "localforage";

import DebugPage from "./pages/debug";

import MapSection from "./pages/Map/Map";
import ListView from "./pages/ListView/ListView";

import SetupIndex from "./pages/Setup/SetupIndex";
import CategoriesPage from "./pages/Setup/Categories";
import TransportPage from "./pages/Setup/Transport";
import BudgetPage from "./pages/Setup/Budget";
import PreferencesIndex from "./pages/Setup/PreferencesIndex";
import TimePage from "./pages/Setup/Time";
import {CreateGroup, CreateProfile, Groups, JoinGroup} from "./pages/Groups/Groups";
// @ts-ignore
import {Conn} from "./ws"
import { Group, Message, MessageType } from "./model/model";
import { useState } from "react";

export default function App() {
  const isSetupDone = localStorage.getItem("setup-done") == "true";

  localforage.config({
    name: "WeEat",
  });

  const [groups, setGroups] = useState<Group[]>([]);
  
  Conn.onmessage = (evt: any) => {
    var messages = evt.data;
    const message: Message = JSON.parse(messages)
    console.log("JoinGroup", message.type)

    if (message.type === MessageType.CreateGroup) {
        setGroups((prevGroups: Group[]) => {
            return [...prevGroups, ...message.payload]
        })

    } else if (message.type === MessageType.JoinGroup) {
        setGroups(message.payload)
        // setPreferences(getGroup(message.payload, message.id)[0])
    } else if (message.type === MessageType.ChangeState) {
        setGroups(message.payload)
        window.location.href = "/map"
    }
}

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={isSetupDone ? <MapSection /> : <SetupIndex />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/map/list-view" element={<ListView />} />
        <Route path="/preferences/" element={<PreferencesIndex />} />
        <Route path="/preferences/setup" element={<SetupIndex />} />
        <Route path="/preferences/categories" element={<CategoriesPage />} />
        <Route path="/preferences/transport" element={<TransportPage />} />
        <Route path="/preferences/time" element={<TimePage />} />
        <Route path="/preferences/budget" element={<BudgetPage />} />
        <Route path="/groups" element={<Groups/>} />
        <Route path="/groups/create/profile" element={<CreateProfile/>} />
        <Route path="/groups/create" element={<CreateGroup/>} />
        <Route path="/groups/join" element={<JoinGroup groups={groups} setGroups={groups}/>} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
