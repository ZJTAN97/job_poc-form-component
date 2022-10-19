import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProfile from "./pages/CreateProfile";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/create-profile" element={<CreateProfile />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
