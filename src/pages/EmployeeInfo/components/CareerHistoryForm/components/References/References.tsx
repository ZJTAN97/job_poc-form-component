import React from "react";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
import { SourceType } from "../../../../../../model/common/Source";

export type MassApplyingFields = {
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
  arrayId?: number;
};

/** Main Context Type */
export type ReferencesStateMethods = {
  /** panel state */
  openPanel: boolean;

  /** setter method to manage state of panel */
  setOpenPanel: (arg: boolean) => void;

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

  /** state to remember last source added */
  lastSource?: SourceType;

  /** setter method for setting last source being added */
  setLastSource: (arg: SourceType) => void;

  /** state to track mass applied fields */
  massApplyingFields?: MassApplyingFields[];

  /** setter method for setting fields being added to mass applied array */
  setMassApplyingFields: (arg?: MassApplyingFields[]) => void;
};

/** Creation of Context */
export const ReferenceStateContext = React.createContext<
  ReferencesStateMethods | undefined
>(undefined);

/** Think of it as using the initial values */
export const useReferencesStateMethods = (): ReferencesStateMethods => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [currentField, setCurrentField] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState(0);
  const [lastSource, setLastSource] = React.useState<SourceType>();
  const [massApplyingFields, setMassApplyingFields] =
    React.useState<MassApplyingFields[]>();

  return {
    openPanel,
    setOpenPanel,
    currentField,
    setCurrentField,
    currentArrayId,
    setCurrentArrayId,
    lastSource,
    setLastSource,
    massApplyingFields,
    setMassApplyingFields,
  };
};

/** Think of it as using the current values after much manipulation */
export const useReferenceStateContext = () =>
  React.useContext(ReferenceStateContext);
