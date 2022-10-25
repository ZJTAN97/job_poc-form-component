import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import React from "react";
import {
  FormProvider,
  useForm,
  Control,
  FormState,
  ValidationMode,
} from "react-hook-form";
import { ChipSelection } from "./components/ChipSelection";
import { TextArea } from "./components/TextArea";
import { TextInput } from "./components/TextInput";

interface BaseFormProps {
  useLocalStorage: boolean;
  preventLeaving: boolean;
  children: React.ReactNode;
  formMode?: keyof ValidationMode;
  formSchema: any; // TODO: need to enforce type safety
  defaultValues: { [key: string]: string | Date | number };
  submitCallback: CallableFunction;
}

type FormProps = BaseFormProps &
  (
    | {
        submitType: "button";
        buttonChild: React.ReactNode;
        buttonClassName?: string;
        customSubmitComponent?: never;
      }
    | {
        submitType: "others";
        buttonChild?: never;
        buttonClassName?: never;
        customSubmitComponent: React.ReactNode;
      }
  );

interface FormContextProps {
  control: Control | undefined;
  formState: FormState<any> | undefined;
}

export const FormContext = React.createContext<FormContextProps>({
  control: undefined,
  formState: undefined,
});

const Form = ({
  useLocalStorage,
  preventLeaving,
  children,
  formMode,
  formSchema,
  defaultValues,
  submitType,
  buttonChild,
  buttonClassName,
  submitCallback,
  customSubmitComponent,
}: FormProps) => {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: formMode ? formMode : "onChange",
    defaultValues,
  });

  const { formState, control, handleSubmit } = methods;
  const { isDirty, isValid } = formState;

  const submitForm = handleSubmit(async (data) => {
    submitCallback();
    console.log(data);
  });

  // // sanity check
  // console.log(watch());

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
    console.log("[INFO] Side effect triggered");
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [beforeUnload]);

  return (
    <FormContext.Provider value={{ control, formState }}>
      <FormProvider {...methods}>{children}</FormProvider>
      {submitType === "button" ? (
        <Button
          className={buttonClassName}
          onClick={submitForm}
          disabled={!isValid}
        >
          {buttonChild}
        </Button>
      ) : (
        <div onClick={submitForm}>{customSubmitComponent}</div>
      )}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextProps => {
  const context = React.useContext(FormContext);
  if (!context.control || !context.formState) {
    throw new Error(
      "Form compound component must be used within a <Form Component> component."
    );
  }
  return context;
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;

export default Form;
