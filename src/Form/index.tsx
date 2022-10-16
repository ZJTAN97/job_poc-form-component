import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps {
    methods: UseFormReturn<any>;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ methods, children }) => {
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
