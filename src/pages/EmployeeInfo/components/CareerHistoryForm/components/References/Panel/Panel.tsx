import React from "react";
import useReferencesTool from "../hook";

export const Panel = () => {
  const { openPanel } = useReferencesTool();

  return <div>{openPanel ? "Open panel" : "close panel"}</div>;
};
