import React from "react";
import { TextInput as MantineTextInput } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

export interface TextInputProps extends FormCommonProps {
    label: string;
    error?: React.ReactNode;
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
    const { field, fieldState } = useController({ name, control });

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
            error={error || fieldState.error?.message}
            type={type}
        />
    );
};
