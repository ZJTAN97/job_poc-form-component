import React from "react";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";

export type MassApplyingFields = {
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
  arrayId?: number;
};

interface ReferenceState {
  openPanel: boolean;
  currentField?: string;
  currentArrayId?: number;
  massApplyingFields?: MassApplyingFields[];
}

type ReferenceActions =
  | {
      type: "EDIT_ONE";
      currentField: string;
      currentArrayId?: number;
    }
  | {
      type: "RESET_ALL";
    }
  | {
      type: "MASS_ADD";
      massApplyingFields: MassApplyingFields[];
    };

const initialReferenceState: ReferenceState = {
  openPanel: false,
  currentField: undefined,
  currentArrayId: undefined,
  massApplyingFields: undefined,
};

function referenceStaterReducer(
  state: ReferenceState,
  action: ReferenceActions,
): ReferenceState {
  switch (action.type) {
    case "EDIT_ONE":
      return {
        ...state,
        openPanel: true,
        currentField: action.currentField,
        currentArrayId: action.currentArrayId,
      };

    case "RESET_ALL":
      return initialReferenceState;

    case "MASS_ADD":
      return {
        ...state,
        openPanel: true,
        currentField: undefined,
        currentArrayId: undefined,
        massApplyingFields: action.massApplyingFields,
      };

    default:
      return initialReferenceState;
  }
}

/** Creation of Context */
export const ReferenceStateContext2 = React.createContext<
  ReferenceState | undefined
>(undefined);

/** Hook to setup and use initial setup */
export const useReferenceStateMethods2 = () => {
  const [state, dispatch] = React.useReducer(
    referenceStaterReducer,
    initialReferenceState,
  );

  const { openPanel, currentArrayId, currentField } = state;

  return {
    openPanel,
    currentArrayId,
    currentField,
    dispatchReferenceState: dispatch,
  };
};

/** Hook to retrieve reference context values from any component */
export const useReferenceStateContext2 = () => {
  const context = React.useContext(ReferenceStateContext2);
  if (context === undefined)
    throw new Error("Context must be used within provider");
  return context;
};
