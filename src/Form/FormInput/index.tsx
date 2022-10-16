import { Input, Label } from "@fluentui/react-components";
import React from "react";
import { Control, useController, useFormContext } from "react-hook-form";

interface FormInputProps {
    type: "input" | "checkbox";
    name: string;
    label: string;
    control: Control<any>;
}

const FormInput: React.FC<FormInputProps> = ({ type, name, label }) => {
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({ control, name });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                maxWidth: "400px",
            }}
        >
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                onChange={(event) => onChange(event.target.value)}
                value={value}
                aria-label={name}
                ref={ref}
                disabled={isSubmitting}
            />
            {error?.message}{" "}
        </div>
    );
};

export default FormInput;
