import { Chip } from "@mantine/core";
import React from "react";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";
import "./index.css";

interface ChipSelectionProps<T> extends FormCommonProps {
    selections: T[];
}

export function ChipSelection<T extends String>({
    control,
    name,
    customOnChange,
    className,
    disabled,
    selections,
}: ChipSelectionProps<T>) {
    const { field } = useController({ name, control });

    const onChangeCallback = React.useCallback(
        (selection: T) => {
            if (customOnChange) customOnChange();
            field.onChange(selection);
        },
        [field.name]
    );

    return (
        <div className={"chip__row" + " " + className}>
            {selections.map((item) => (
                <Chip
                    key={JSON.stringify(item)}
                    disabled={disabled}
                    checked={field.value === item}
                    onChange={() => onChangeCallback(item)}
                >
                    {item}
                </Chip>
            ))}
        </div>
    );
}
