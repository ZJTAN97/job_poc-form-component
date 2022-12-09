import { Select, SelectProps } from "@mantine/core";
import React from "react";
import { FormCommonProps } from "../../typings";
import { useController } from "react-hook-form";

interface DropdownProps extends Omit<SelectProps, "onChange">, FormCommonProps {
  onChange?: (value: string | null) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { control, onChange, ...mantineSelectProps } = props;

  const { field } = useController({
    name: String(mantineSelectProps.name),
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
