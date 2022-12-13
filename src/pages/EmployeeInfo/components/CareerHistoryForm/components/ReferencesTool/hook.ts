import React from "react";
import { ReferencesToolContext } from "./ReferencesTool";

const useReferencesTool = () => {
  return React.useContext(ReferencesToolContext);
};

export default useReferencesTool;
