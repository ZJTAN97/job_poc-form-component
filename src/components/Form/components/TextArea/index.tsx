import React from "react";
import { Textarea as MantineTextArea } from "@mantine/core";
import { Control, useController } from "react-hook-form";

interface TextInputProps {
    name: string;
    control: Control<any>;
    disabled?: boolean;
    className?: string;
    label: string;
    error?: React.ReactNode;
    customOnChange?: CallableFunction;
}

export const TextArea = ({
    name,
    control,
    label,
    disabled,
    error,
    customOnChange,
    className,
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
        <MantineTextArea
            disabled={disabled}
            className={className}
            label={label}
            value={field.value}
            onChange={(e) => onChangeCallback(e.target.value)}
            error={error || fieldState.error?.message}
        />
    );
};
