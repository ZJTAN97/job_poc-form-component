import { Chip } from "@mantine/core";
import React from "react";
import { useController } from "react-hook-form";
import { useFormContext } from "../..";
import { FormCommonProps } from "../../typings";
import "./index.css";

interface ChipSelectionProps<T> extends FormCommonProps {
  selections: T[];
}

export function ChipSelection<T extends String>({
  name,
  customOnChange,
  className,
  selections,
}: ChipSelectionProps<T>) {
  const context = useFormContext();

  const { control, formState } = context;
  const { isSubmitting } = formState!;
  const { field, fieldState } = useController({ name, control });

  const onChangeCallback = React.useCallback(
    (selection: T) => {
      if (customOnChange) customOnChange();
      field.onChange(selection);
    },
    [field, customOnChange]
  );

  return (
    <div className={"chip__row" + " " + className}>
      {selections.map((item) => (
        <Chip
          key={JSON.stringify(item)}
          disabled={isSubmitting}
          checked={field.value === item}
          onChange={() => onChangeCallback(item)}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
}
