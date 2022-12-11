import React from "react";
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { FieldValues, Path, useController } from "react-hook-form";
import { FormCommonProps } from "../typings";

export interface FormMultiSelectProps<T extends FieldValues>
  extends Omit<MultiSelectProps, "onChange" | "name">,
    FormCommonProps<T> {
  name: Path<T>;
  onChange?: (value: string[]) => void;
}

const MultiSelect = <T extends FieldValues>(props: FormMultiSelectProps<T>) => {
  const { control, name, onChange, ...mantineMultiInputProps } = props;

  const { field, fieldState } = useController({
    name,
    control,
  });

  const overrideOnChange = React.useCallback(
    (values: string[]) => {
      if (onChange) onChange(values);
      field.onChange(values);
    },
    [onChange],
  );

  return (
    <MantineMultiSelect
      {...mantineMultiInputProps}
      error={mantineMultiInputProps.error || fieldState.error?.message}
      onChange={overrideOnChange}
    />
  );
};

export default MultiSelect;
