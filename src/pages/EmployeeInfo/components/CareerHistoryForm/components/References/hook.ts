import React from "react";
import { ReferencesContext } from "./References";

const useReferencesTool = () => {
  return React.useContext(ReferencesContext);
};

export default useReferencesTool;
