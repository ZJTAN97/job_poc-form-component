import React from "react";
import "./App.css";
import { ReactLocation, Router } from "@tanstack/react-location";
import Profile from "./pages/Profile";
import { CareerHistory } from "./pages/CareerHistory";
import { CreateEmployee } from "./pages/CreateEmployee";

const App: React.FC = () => {
  const reactLocation = new ReactLocation();

  return (
    <>
      <Router
        location={reactLocation}
        routes={[
          {
            path: "/create-employee",
            element: <CreateEmployee />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/career-history",
            element: <CareerHistory />,
          },
          {
            element: <CreateEmployee />, // default fallback
          },
        ]}
      />
    </>
  );
};

export default App;
