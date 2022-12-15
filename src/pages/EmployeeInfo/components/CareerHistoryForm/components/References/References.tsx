import React from "react";

export type ReferencesStateMethods = {
  openPanel: boolean;
  setOpenPanel: (arg: boolean) => void;
};

export const useReferencesStateMethods = (): ReferencesStateMethods => {
  const [openPanel, setOpenPanel] = React.useState(false);
  return {
    openPanel,
    setOpenPanel,
  };
};
