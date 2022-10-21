import React from "react";
import { Textarea as MantineTextArea } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

interface TextInputProps extends FormCommonProps {
    label: string;
    error?: React.ReactNode;
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
