import React from "react";
import "./App.css";
import CreateProfile from "./pages/CreateProfile";
import { ReactLocation, Router } from "@tanstack/react-location";
import Profile from "./pages/Profile";
import CreateGuild from "./pages/CreateGuild";

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
            path: "/create-guild",
            element: <CreateGuild />,
          },
          {
            element: (
              <>
                <div>
                  <a href="/create-profile">Go to create character</a>
                </div>
                <div>
                  <a href="/create-guild">Go to create guild</a>
                </div>
              </>
            ), // default fallback
          },
        ]}
      />
    </>
  );
};

export default App;
