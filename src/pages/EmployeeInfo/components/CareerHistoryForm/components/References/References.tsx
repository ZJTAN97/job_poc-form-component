import React from "react";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";

/** Main Context Type */
export type ReferencesStateMethods = {
  openPanel: boolean;
  setOpenPanel: (arg: boolean) => void;
  editMode: boolean;
  setEditMode: (arg: boolean) => void;
  currentName?:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;
  setCurrentName: (
    arg?: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => void;
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
  const [editMode, setEditMode] = React.useState(false);
  const [currentName, setCurrentName] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState<number>();

  return {
    openPanel,
    setOpenPanel,
    editMode,
    setEditMode,
    currentName,
    setCurrentName,
    currentArrayId,
    setCurrentArrayId,
  };
};

/** Think of it as using the current values after much manipulation */
export const useReferenceStateContext = () =>
  React.useContext(ReferenceStateContext);
