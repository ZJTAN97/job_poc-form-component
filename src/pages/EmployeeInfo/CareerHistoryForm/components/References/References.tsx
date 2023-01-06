import React from "react";
import { Path } from "react-hook-form";
import { CareerType } from "../../../../../model/Career";

/** Main Context Type */
export type ReferencesStateMethods = {
  /** panel state */
  openPanel: boolean;

  /** setter method to manage state of panel */
  setOpenPanel: (arg: boolean) => void;

  currentField?: Path<CareerType>;

  setCurrentField: (arg?: Path<CareerType>) => void;

  currentArrayId?: number;

  setCurrentArrayId: (arg?: number) => void;
};

/** Creation of Context */
export const ReferenceStateContext = React.createContext<
  ReferencesStateMethods | undefined
>(undefined);

/** Think of it as using the initial values */
export const useReferencesStateMethods = (): ReferencesStateMethods => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [currentField, setCurrentField] = React.useState<Path<CareerType>>();
  const [currentArrayId, setCurrentArrayId] = React.useState<number>();

  return {
    openPanel,
    setOpenPanel,
    currentField,
    setCurrentField,
    currentArrayId,
    setCurrentArrayId,
  };
};

/** Think of it as using the current values after much manipulation */
export const useReferenceStateContext = () =>
  React.useContext(ReferenceStateContext);
