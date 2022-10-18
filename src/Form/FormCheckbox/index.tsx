import { Checkbox } from "@mantine/core";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface FormCheckboxProps {
  label: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label }) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value, ref },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ control, name: label });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        maxWidth: "400px",
      }}
    >
      <Checkbox
        label={label}
        checked={value}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
    </div>
  );
};

export default FormCheckbox;
