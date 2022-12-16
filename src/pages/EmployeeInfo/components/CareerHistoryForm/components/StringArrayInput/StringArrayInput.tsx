import { TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
} from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
import {
  ArrayContainer,
  ArrayRow,
  ButtonRow,
  ErrorLabel,
  Title,
  useStyles,
} from "./styles";

interface StringArrayInputProps<T extends FieldValues> {
  name: Path<T>;
  editMode: boolean;
  referenceTrigger: (index: number) => React.ReactNode;

  /** Required for row highlight */
  currentName?:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;

  /** Required for row highlight */
  currentArrayId: number;

  massApplyingFields?: {
    field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
    content: string;
  }[];
}

export const StringArrayInput = <T extends FieldValues>({
  name,
  editMode,
  referenceTrigger,
  currentName,
  currentArrayId,
  massApplyingFields,
}: StringArrayInputProps<T>) => {
  const { classes } = useStyles();
  const { control, formState } = useFormContext<T>();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
  });

  const arrayErrors = errors[name] as unknown as { [key: string]: string }[];

  return (
    <ArrayContainer>
      <ButtonRow>
        <Title disabled={!editMode}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Title>
        <IconCirclePlus
          color={!editMode ? "rgb(0 0 0 / 30%)" : "black"}
          onClick={() => field.onChange([...field.value, ""])}
        />
      </ButtonRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((val: string, id: number) => (
        <ArrayRow
          key={"string_array_" + id}
          highlight={
            (!editMode && currentArrayId === id && currentName === "skills") ||
            massApplyingFields?.filter(
              (item) => item.field === "skills" && item.content === val,
            ).length === 1
          }
        >
          <TextInput
            label={`${name.charAt(0).toUpperCase() + name.slice(1)} #${id + 1}`}
            value={val}
            className={classes.skillTextInput}
            onChange={(e) => {
              let current = [...field.value];
              current[id] = e.target.value;
              field.onChange(current);
            }}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            rightSection={
              editMode && (
                <IconX
                  key={"string-array-icon" + id}
                  size={20}
                  onClick={() => {
                    let current = [...field.value];
                    current.splice(id, 1);
                    field.onChange(current);
                  }}
                />
              )
            }
            error={
              arrayErrors &&
              arrayErrors.length > 0 &&
              arrayErrors[id] &&
              arrayErrors[id].message
            }
          />
          {referenceTrigger(id)}
        </ArrayRow>
      ))}
    </ArrayContainer>
  );
};
