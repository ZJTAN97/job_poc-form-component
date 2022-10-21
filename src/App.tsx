import React from "react";
import "./App.css";
import CreateProfile from "./pages/CreateProfile";
import { ReactLocation, Router } from "@tanstack/react-location";
import Profile from "./pages/Profile";

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
                        element: (
                            <div>
                                <a href="/create-profile">Go to creation</a>
                            </div>
                        ), // default fallback
                    },
                ]}
            />
        </>
    );
};

export default App;
