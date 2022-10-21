import React from "react";
import { TextInput as MantineTextInput } from "@mantine/core";
import { Control, useController } from "react-hook-form";

interface TextInputProps {
    label: string;
    error?: React.ReactNode;
    customOnChange?: CallableFunction;
    name: string;
    control: Control<any>;
    disabled?: boolean;
    className?: string;
    type?: React.HTMLInputTypeAttribute;
}

export const TextInput = ({
    name,
    control,
    label,
    disabled,
    error,
    customOnChange,
    className,
    type,
}: TextInputProps) => {
    const { field } = useController({ name, control });

    const onChangeCallback = React.useCallback(
        (searchValue: string) => {
            if (customOnChange) customOnChange(searchValue);
            field.onChange(searchValue);
        },
        [field.name]
    );

    return (
        <MantineTextInput
            disabled={disabled}
            className={className}
            label={label}
            value={field.value}
            onChange={(e) => onChangeCallback(e.target.value)}
            error={error}
            type={type}
        />
    );
};
