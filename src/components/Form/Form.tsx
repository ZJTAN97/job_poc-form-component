import React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { ChipSelection } from "./ChipSelection/ChipSelection";
import Dropdown from "./Dropdown/Dropdown";
import MultiSelect from "./MultiSelect/MultiSelect";
import { TextArea } from "./TextArea/TextArea";
import { TextInput } from "./TextInput/TextInput";

interface BaseFormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  useLocalStorage?: boolean;
  preventLeaving?: boolean;
  children: React.ReactNode;
}

type FormProps<
  T extends FieldValues,
  AdditionalFormStateMethods,
> = BaseFormProps<T> &
  (
    | {
        additionalContextValues: AdditionalFormStateMethods;
        AdditionalContext: React.Context<AdditionalFormStateMethods>;
      }
    | {
        additionalContextValues?: never;
        AdditionalContext?: never;
      }
  );

export const Form = <T extends FieldValues, AdditionalFormStateMethods>({
  methods,
  useLocalStorage,
  preventLeaving,
  children,
  additionalContextValues,
  AdditionalContext,
}: FormProps<T, AdditionalFormStateMethods>) => {
  const { formState } = methods;
  const { isDirty } = formState;

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
      {AdditionalContext && additionalContextValues ? (
        <AdditionalContext.Provider value={additionalContextValues}>
          {children}
        </AdditionalContext.Provider>
      ) : (
        children
      )}
    </FormProvider>
  );
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;
Form.Dropdown = Dropdown;
Form.MultiSelect = MultiSelect;

// type AdditionalFormStateMethodsProps = {
//   openPanel: boolean;
//   setOpenPanel: (arg: boolean) => void;
// };

// const AdditionalFormStateContext = React.createContext<
//   AdditionalFormStateMethodsProps | undefined
// >(undefined);

// export const useAdditionalFormContext = (): AdditionalFormStateMethodsProps => {
//   const [openPanel, setOpenPanel] = React.useState(false);
//   return {
//     openPanel,
//     setOpenPanel,
//   };
// };

// export const useAdditionalFormStateContext = () =>
//   React.useContext(AdditionalFormStateContext);
