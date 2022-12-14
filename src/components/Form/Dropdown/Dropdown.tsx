import { Select, SelectProps } from "@mantine/core";
import React from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

interface DropdownProps<T extends FieldValues>
  extends Omit<SelectProps, "onChange" | "name"> {
  name: Path<T>;
  onChange?: (value: string | null) => void;
}

const Dropdown = <T extends FieldValues>(props: DropdownProps<T>) => {
  const { name, onChange, ...mantineSelectProps } = props;

  const { control } = useFormContext<T>();

  const { field } = useController({
    name,
    control,
  });

  const overrideOnChange = React.useCallback(
    (values: string | null) => {
      if (onChange) onChange(values);
      field.onChange(values);
    },
    [onChange],
  );

  return (
    <Select
      value={field.value}
      {...mantineSelectProps}
      onChange={overrideOnChange}
    />
  );
};

export default Dropdown;
