import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { TextInput as MantineTextInput } from "@mantine/core";
import { useController, Control } from "react-hook-form";

interface TextInputProps {
  disabled?: boolean;
  label?: string;
  error?: React.ReactNode;
  name: string;
  control: Control<any>;
  additionalCallBacks?: CallableFunction;
}

const TextInput = ({
  disabled,
  label,
  error,
  name,
  control,
  additionalCallBacks,
}: TextInputProps) => {
  const { field } = useController({ name, control });

  const onChangeCallback = React.useCallback(
    (searchValue: string) => {
      if (additionalCallBacks) additionalCallBacks(searchValue);
      field.onChange(searchValue);
    },
    [field.name]
  );

  return (
    <div>
      <MantineTextInput
        disabled={disabled}
        className="input"
        label={label}
        value={field.value}
        onChange={(e) => onChangeCallback(e.target.value)}
        error={error}
      />
    </div>
  );
};

interface CesFormProps {
  methods: UseFormReturn<any>;
  useLocalStorage: boolean;
  preventLeaving: boolean;
  children: React.ReactNode;
}

const CesForm = ({
  methods,
  useLocalStorage,
  preventLeaving,
  children,
}: CesFormProps) => {
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
    [isDirty, preventLeaving]
  );

  React.useEffect(() => {
    console.log("--");
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [beforeUnload]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

CesForm.TextInput = TextInput;

export default CesForm;
