import { useListState, UseListStateHandlers } from "@mantine/hooks";
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
  currentArrayId?: number;

  /** setter method for which item in the array is being selected */
  setCurrentArrayId: (arg?: number) => void;

  /** state to remember last source added */
  lastSource?: SourceType;

  /** setter method for setting last source being added */
  setLastSource: (arg: SourceType) => void;

  /** to keep track whether mass apply mode is on or off */
  isMassApply: boolean;

  /** set mass apply mode */
  setIsMassApply: (arg: boolean) => void;

  /** state to track mass applied fields */
  massApplyingFields: MassApplyingFields[];

  /** setter method for setting fields being added to mass applied array */
  handleMassApplyingFields: UseListStateHandlers<MassApplyingFields>;
};

/** Creation of Context */
export const ReferenceStateContext = React.createContext<
  ReferencesStateMethods | undefined
>(undefined);

enum ReferenceStateModes {
  EDIT = "EDIT",
  MASS = "MASS",
  RESET = "RESET",
}

interface ReferenceState {
  openPanel: boolean;
  currentField?: string;
  currentArrayId?: number;
}

type ReferenceActions = ReferenceState & {
  type: ReferenceStateModes;
};

const initialReferenceState: ReferenceState = {
  openPanel: false,
  currentField: undefined,
  currentArrayId: undefined,
};

function referenceStaterReducer(
  state: ReferenceState,
  action: ReferenceActions,
): ReferenceState {
  const { type, ...payload } = action;

  switch (type) {
    case ReferenceStateModes.EDIT:
      return {
        ...state,
        currentField: action.currentField,
        currentArrayId: action.currentArrayId,
      };

    case ReferenceStateModes.RESET:
      return initialReferenceState;

    default:
      return initialReferenceState;
  }
}

/** Think of it as using the initial values */
export const useReferencesStateMethods = (): ReferencesStateMethods => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [currentField, setCurrentField] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState<number>();
  const [lastSource, setLastSource] = React.useState<SourceType>();
  const [isMassApply, setIsMassApply] = React.useState(false);
  const [massApplyingFields, handleMassApplyingFields] =
    useListState<MassApplyingFields>();

  // reducer test
  const [state, dispatch] = React.useReducer(
    referenceStaterReducer,
    initialReferenceState,
  );

  return {
    openPanel,
    setOpenPanel,
    currentField,
    setCurrentField,
    currentArrayId,
    setCurrentArrayId,
    lastSource,
    setLastSource,
    isMassApply,
    setIsMassApply,
    massApplyingFields,
    handleMassApplyingFields,
  };
};

/** Think of it as using the current values after much manipulation */
export const useReferenceStateContext = () => {
  const context = React.useContext(ReferenceStateContext);
  if (context === undefined)
    throw new Error("Context must be used within provider");
  return context;
};
