import { TextInput } from "@mantine/core";
import React from "react";
import { useController } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
}

/**'
 * It's ideal to use a single useController per component. 
 * If you need to use more than one, make sure you rename the prop. May want to consider using Controller instead.
 */

const FormInput: React.FC<FormInputProps> = ({ name, label }) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        maxWidth: "400px",
      }}
    >
      <TextInput
        ref={ref}
        label={label}
        withAsterisk
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error?.message}
      />
    </div>
  );
};

export default FormInput;
