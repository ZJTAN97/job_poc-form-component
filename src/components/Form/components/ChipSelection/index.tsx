import { Chip } from "@mantine/core";
import React from "react";
import { Control, useController } from "react-hook-form";
import "./index.css";

interface ChipSelectionProps {
    name: string;
    control: Control<any>;
    disabled?: boolean;
    className?: string;
    selections: string[];
    customOnChange?: CallableFunction;
}

export const ChipSelection = ({
    control,
    name,
    customOnChange,
    className,
    disabled,
    selections,
}: ChipSelectionProps) => {
    const { field } = useController({ name, control });

    const onChangeCallback = React.useCallback(
        (selection: string) => {
            if (customOnChange) customOnChange();
            field.onChange(selection);
        },
        [field.name]
    );

    return (
        <div className={"chip__row" + " " + className}>
            {selections.map((item) => (
                <Chip
                    key={item}
                    disabled={disabled}
                    checked={field.value === item}
                    onChange={() => onChangeCallback(item)}
                >
                    {item}
                </Chip>
            ))}
        </div>
    );
};
