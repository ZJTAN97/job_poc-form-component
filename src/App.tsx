import React from "react";
import "./App.css";
import CreateProfile from "./pages/CreateProfile";
import { ReactLocation, Router } from "@tanstack/react-location";
import Profile from "./pages/Profile";
import CreateCareer from "./pages/CreateCareer";

const App: React.FC = () => {
  const reactLocation = new ReactLocation();

  return (
    <>
      <Router
        location={reactLocation}
        routes={[
          {
            path: "/create-profile",
            element: <CreateProfile />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/create-career",
            element: <CreateCareer />,
          },
          {
            element: <CreateProfile />, // default fallback
          },
        ]}
      />
    </>
  );
};

export default App;
