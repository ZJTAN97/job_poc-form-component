import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { ChipSelection } from "./components/ChipSelection";
import { TextArea } from "./components/TextArea";
import { TextInput } from "./components/TextInput";

interface FormProps<T> {
    methods: UseFormReturn<any>;
    useLocalStorage: boolean;
    preventLeaving: boolean;
    children: React.ReactNode;
    // testing feasibility of including schema here
    formSchema: any;
}

const Form = <T,>({
    methods,
    useLocalStorage,
    preventLeaving,
    children,
    formSchema,
}: FormProps<T>) => {
    const { formState } = methods;
    const { isDirty } = formState;

    // still testing the feasibility of this method
    const methods2 = useForm<typeof formSchema>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

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

    return <FormProvider {...methods}>{children}</FormProvider>;
};

Form.TextInput = TextInput;
Form.TextArea = TextArea;
Form.ChipSelection = ChipSelection;

export default Form;
