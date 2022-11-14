import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { ChipSelection } from "./components/ChipSelection";
import Dropdown from "./components/Dropdown";
import MultiSelect from "./components/MultiSelect";
import { TextArea } from "./components/TextArea";
import { TextInput } from "./components/TextInput";

interface FormProps {
  methods: UseFormReturn<any>;
  useLocalStorage: boolean;
  preventLeaving: boolean;
  children: React.ReactNode;
}

export const Form = ({
  methods,
  useLocalStorage,
  preventLeaving,
  children,
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
    console.log("[INFO] Side effect triggered");
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [beforeUnload]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;
Form.Dropdown = Dropdown;
Form.MultiSelect = MultiSelect;
