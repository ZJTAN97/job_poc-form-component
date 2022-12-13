import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import {
  ReferencesContext,
  ReferencesProps,
  ReferencesProvider,
} from "../../pages/EmployeeInfo/components/CareerHistoryForm/components/References";
import { ChipSelection } from "./ChipSelection/ChipSelection";
import Dropdown from "./Dropdown/Dropdown";
import MultiSelect from "./MultiSelect/MultiSelect";
import { TextArea } from "./TextArea/TextArea";
import { TextInput } from "./TextInput/TextInput";

interface FormProps {
  methods: UseFormReturn<any>;
  useLocalStorage?: boolean;
  preventLeaving?: boolean;
  children: React.ReactNode;
  referencesForm?: boolean;
}

export const Form = ({
  methods,
  useLocalStorage,
  preventLeaving,
  children,
  referencesForm,
}: FormProps) => {
  const { formState } = methods;
  const { isDirty } = formState;

  if (useLocalStorage) {
    // TODO: add localstorage logic here
  }

  // Wrapped in useCallback to ensure its the same reference function
  // as useEffect dependency array has beforeUnload
  // prevents side effects re-rendering when updating form
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
    <>
      {referencesForm ? (
        <ReferencesProvider>
          <FormProvider {...methods}>{children}</FormProvider>
        </ReferencesProvider>
      ) : (
        <FormProvider {...methods}>{children}</FormProvider>
      )}
    </>
  );
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;
Form.Dropdown = Dropdown;
Form.MultiSelect = MultiSelect;
