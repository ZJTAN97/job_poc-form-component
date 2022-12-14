import { Chip, ChipProps } from "@mantine/core";
import React from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import styles from "./index.module.css";

interface ChipSelectionProps<T extends FieldValues, K>
  extends Omit<ChipProps, "children" | "onChange" | "name"> {
  name: Path<T>;
  selections: K[];
  groupClassName?: string;
  onChange?: CallableFunction;
}

export function ChipSelection<T extends FieldValues, K extends String>(
  props: ChipSelectionProps<T, K>,
) {
  const { name, onChange, ...mantineChipProps } = props;

  const { control } = useFormContext<T>();

  const { field } = useController({ name, control });

  const overrideOnChange = React.useCallback(
    (selection: K) => {
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
