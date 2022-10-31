import { Chip, ChipProps } from "@mantine/core";
import React from "react";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";
import "./index.css";

interface ChipSelectionProps<T>
  extends FormCommonProps,
    Omit<ChipProps, "children"> {
  name: string;
  selections: T[];
  groupClassName?: string;
}

export function ChipSelection<T extends String>(props: ChipSelectionProps<T>) {
  const { name, control, customOnChange, ...mantineChipProps } = props;

  const { field } = useController({ name: name, control: control });

  const onChangeCallback = React.useCallback(
    (selection: T) => {
      if (props.customOnChange) props.customOnChange();
      field.onChange(selection);
    },
    [field.name]
  );

  return (
    <div className={"chip__row" + " " + props.groupClassName}>
      {props.selections.map((item) => (
        <Chip
          key={JSON.stringify(item)}
          {...mantineChipProps}
          checked={field.value === item}
          onChange={() => onChangeCallback(item)}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
}
