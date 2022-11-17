import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MantineProvider withCSSVariables withNormalizeCSS withGlobalStyles>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
