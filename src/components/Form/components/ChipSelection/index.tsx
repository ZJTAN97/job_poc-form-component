import { Chip, ChipProps } from "@mantine/core";
import React from "react";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";
import styles from "./index.module.css";

interface ChipSelectionProps<T>
  extends FormCommonProps,
    Omit<ChipProps, "children" | "onChange"> {
  name: string;
  selections: T[];
  groupClassName?: string;
  onChange?: CallableFunction;
}

export function ChipSelection<T extends String>(props: ChipSelectionProps<T>) {
  const { name, control, onChange, ...mantineChipProps } = props;

  const { field } = useController({ name: name, control: control });

  const overrideOnChange = React.useCallback(
    (selection: T) => {
      if (onChange) onChange();
      field.onChange(selection);
    },
    [onChange],
  );

  return (
    <div className={styles.main__container + " " + props.groupClassName}>
      {props.selections.map((item) => (
        <Chip
          key={JSON.stringify(item)}
          {...mantineChipProps}
          checked={field.value === item}
          onChange={() => overrideOnChange(item)}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
}
