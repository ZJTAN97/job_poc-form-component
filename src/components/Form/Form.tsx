import React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { ChipSelection } from "./ChipSelection/ChipSelection";
import Dropdown from "./Dropdown/Dropdown";
import MultiSelect from "./MultiSelect/MultiSelect";
import { TextArea } from "./TextArea/TextArea";
import { TextInput } from "./TextInput/TextInput";

interface FormProps<T extends FieldValues, AdditionalFormStateMethods> {
  methods: UseFormReturn<T>;
  useLocalStorage?: boolean;
  preventLeaving?: boolean;
  children: React.ReactNode;
  additionalStateMethods?: AdditionalFormStateMethods;
}

function createContext<T>() {
  return React.createContext<T | undefined>(undefined);
}

export const Form = <T extends FieldValues, AdditionalFormStateMethods>({
  methods,
  useLocalStorage,
  preventLeaving,
  children,
  additionalStateMethods,
}: FormProps<T, AdditionalFormStateMethods>) => {
  const { formState } = methods;
  const { isDirty } = formState;

  const AdditionalFormStateContext =
    createContext<AdditionalFormStateMethods>();

  if (useLocalStorage) {
    // TODO: add localstorage logic here
  }

  const beforeUnload = React.useCallback(
    (event: BeforeUnloadEvent) => {
      if (preventLeaving && isDirty) {
        event.returnValue = true;
      }
    },
    [isDirty, preventLeaving],
  );

  React.useEffect(() => {
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [beforeUnload]);

  return (
    <FormProvider {...methods}>
      <AdditionalFormStateContext.Provider value={additionalStateMethods}>
        {children}
      </AdditionalFormStateContext.Provider>
    </FormProvider>
  );
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;
Form.Dropdown = Dropdown;
Form.MultiSelect = MultiSelect;
