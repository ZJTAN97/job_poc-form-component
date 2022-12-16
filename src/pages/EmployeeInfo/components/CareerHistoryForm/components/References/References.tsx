import React from "react";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
import { SourceType } from "../../../../../../model/common/Source";

/** Main Context Type */
export type ReferencesStateMethods = {
  /** panel state */
  openPanel: boolean;

  /** setter method to manage state of panel */
  setOpenPanel: (arg: boolean) => void;

  /** refers to the ability to edit content of the fields */
  editMode: boolean;

  /** setter method to manage editMode */
  setEditMode: (arg: boolean) => void;

  /** refers to the current field being selected to add references */
  currentField?:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;

  /** setter method for current selected field */
  setCurrentField: (
    arg?: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => void;

  /** to differentiate between array fields and non-array fields during selection */
  currentArrayId: number;

  /** setter method for which item in the array is being selected */
  setCurrentArrayId: (arg: number) => void;

  lastSource?: SourceType;

  setLastSource: (arg: SourceType) => void;
};

/** Creation of Context */
export const ReferenceStateContext = React.createContext<
  ReferencesStateMethods | undefined
>(undefined);

/** Think of it as using the initial values */
export const useReferencesStateMethods = (): ReferencesStateMethods => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [editMode, setEditMode] = React.useState(true);
  const [currentField, setCurrentField] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState(0);
  const [lastSource, setLastSource] = React.useState<SourceType>();

  return {
    openPanel,
    setOpenPanel,
    editMode,
    setEditMode,
    currentField,
    setCurrentField,
    currentArrayId,
    setCurrentArrayId,
    lastSource,
    setLastSource,
  };
};

/** Think of it as using the current values after much manipulation */
export const useReferenceStateContext = () =>
  React.useContext(ReferenceStateContext);
