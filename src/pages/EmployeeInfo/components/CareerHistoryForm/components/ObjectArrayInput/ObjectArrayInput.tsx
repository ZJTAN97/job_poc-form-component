import { Button, TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
import {
  ArrayContainer,
  ArrayRow,
  ErrorLabel,
  ObjectArrayRow,
  Title,
  useStyles,
} from "./styles";

interface ObjectArrayInputProps<T extends FieldValues, K extends FieldValues> {
  /** Available naming paths for Form Object */
  name: Path<T>;

  editMode: boolean;

  /** To set empty objects when adding input fields on UI */
  emptyObject: K;

  /** Reference Trigger components to be tagged to each individual input field */
  referenceTrigger: (id: number, name: Path<T> | Path<K>) => React.ReactNode;

  /** Required for row highlight */
  currentName?:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;

  /** Required for row highlight */
  currentArrayId?: number;
}

export const ObjectArrayInput = <T extends FieldValues, K extends FieldValues>({
  name,
  editMode,
  emptyObject,
  referenceTrigger,
  currentName,
  currentArrayId,
}: ObjectArrayInputProps<T, K>) => {
  const { classes } = useStyles();

  const { control, formState } = useFormContext<T>();
  const { errors } = formState;

  const { field } = useController({
    name,
    control,
  });

  const arrayErrors = errors[name] as unknown as {
    [key: string]: { [key: string]: string };
  }[];

  return (
    <ArrayContainer>
      <ArrayRow>
        <Title disabled={!editMode}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Title>
        <IconCirclePlus
          color={!editMode ? "rgb(0 0 0 / 30%)" : "black"}
          onClick={() => field.onChange([...field.value, emptyObject])}
        />
      </ArrayRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((item: PathValue<T, Path<T>>, id: number) => (
        <ObjectArrayRow key={"object_array_" + id}>
          <Button
            ml={15}
            disabled={!editMode}
            onClick={() => {
              let current = [...field.value];
              current.splice(id, 1);
              field.onChange(current);
            }}
            variant="outline"
            color={"blue"}
            size={"xs"}
            mb={10}
            rightIcon={<IconX size={12} />}
            styles={{
              root: {
                ":hover": {
                  color: "red",
                  borderColor: "red",
                },
              },
            }}
          >
            {`${name.charAt(0).toUpperCase() + name.slice(1)} ${id + 1}`}
          </Button>
          <ArrayRow
            highlight={
              !editMode && currentName === "name" && currentArrayId === id
            }
          >
            <TextInput
              label={"Certificate Name"}
              className={classes.textInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, name: e.target.value };
                field.onChange(current);
              }}
              error={
                arrayErrors &&
                arrayErrors.length > 0 &&
                arrayErrors[id] &&
                arrayErrors[id].name?.message
              }
            />
            {referenceTrigger(id, "name" as Path<K>)}
          </ArrayRow>
          <ArrayRow
            highlight={
              !editMode && currentName === "issuedBy" && currentArrayId === id
            }
          >
            <TextInput
              label={"Issued by"}
              className={classes.textInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, issuedBy: e.target.value };
                field.onChange(current);
              }}
              error={
                arrayErrors &&
                arrayErrors.length > 0 &&
                arrayErrors[id] &&
                arrayErrors[id].issuedBy?.message
              }
            />
            {referenceTrigger(id, "issuedBy" as Path<K>)}
          </ArrayRow>
        </ObjectArrayRow>
      ))}
    </ArrayContainer>
  );
};
