import React from "react";
import "./App.css";
import { ReactLocation, Router } from "@tanstack/react-location";
import { CreateEmployee } from "./pages/CreateEmployee";
import { EmployeeInfo } from "./pages/EmployeeInfo";

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
            path: "/employee",
            element: <EmployeeInfo />,
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
