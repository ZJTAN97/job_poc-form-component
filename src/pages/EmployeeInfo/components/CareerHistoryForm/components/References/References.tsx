import { useListState, UseListStateHandlers } from "@mantine/hooks";
import React from "react";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";

export type MassApplyingFields = {
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
  arrayId?: number;
};

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
    };

interface ReferenceState {
  openPanel: boolean;
  currentField?: string;
  currentArrayId?: number;
  isMassApply: boolean;
  massAppliedFields: MassApplyingFields[];
  setMassAppliedFields: UseListStateHandlers<MassApplyingFields>;
  dispatch: React.Dispatch<ReferenceActions>;
}

const initialReferenceState: ReferenceState = {
  openPanel: false,
  currentField: undefined,
  currentArrayId: undefined,
  isMassApply: false,
  massAppliedFields: [],
  setMassAppliedFields: {} as UseListStateHandlers<MassApplyingFields>,
  dispatch: () => {},
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
        isMassApply: false,
        currentField: action.currentField,
        currentArrayId: action.currentArrayId,
      };

    case "RESET_ALL":
      return initialReferenceState;

    case "MASS_ADD":
      return {
        ...state,
        openPanel: true,
        isMassApply: true,
        currentField: undefined,
        currentArrayId: undefined,
      };

    default:
      return initialReferenceState;
  }
}

/** Creation of Context */
const ReferenceStateContext = React.createContext<ReferenceState | undefined>(
  undefined,
);

/** Creation of Context Provider */
export const ReferenceStateProvider = ({
  value,
  children,
}: {
  value: ReferenceState;
  children: React.ReactNode;
}) => {
  return (
    <ReferenceStateContext.Provider value={value}>
      {children}
    </ReferenceStateContext.Provider>
  );
};

/** Hook to setup and use initial setup */
export const useReferenceState = (): ReferenceState => {
  const [state, dispatch] = React.useReducer(
    referenceStaterReducer,
    initialReferenceState,
  );

  const [massAppliedFields, setMassAppliedFields] =
    useListState<MassApplyingFields>([]);

  return {
    ...state,
    massAppliedFields,
    setMassAppliedFields,
    dispatch,
  };
};

/** Hook to retrieve reference context values from any component */
export const useReferenceStateContext = () => {
  const context = React.useContext(ReferenceStateContext);
  if (context === undefined)
    throw new Error("Context must be used within provider");
  return context;
};
