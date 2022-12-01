import { Button, TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import { CareerType } from "../../../../../../model/career/Career";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
  useFieldArray,
  PathValue,
} from "react-hook-form";
import {
  ArrayContainer,
  ArrayRow,
  ErrorLabel,
  ObjectArrayRow,
  useStyles,
} from "./styles";

interface ObjectArrayInputProps<T extends FieldValues, K extends FieldValues> {
  name: Path<T>;
  objectKeys: (keyof K)[];
  editMode: boolean;
}

export const ObjectArrayInput = <T extends FieldValues, K extends FieldValues>({
  name,
  editMode,
}: ObjectArrayInputProps<T, K>) => {
  const { classes } = useStyles();

  const { control, formState } = useFormContext<T>();
  const { errors } = formState;

  const { field } = useController({
    name,
    control,
  });

  return (
    <ArrayContainer>
      <ArrayRow>
        <Button
          p={0}
          mb={10}
          rightIcon={<IconCirclePlus />}
          variant="subtle"
          size="lg"
          onClick={() =>
            field.onChange([
              ...field.value,
              {
                name: "",
                issuedBy: "",
              },
            ])
          }
          color={"black"}
          disabled={!editMode}
        >
          Certifications
        </Button>
      </ArrayRow>
      {errors.certs && (
        <ErrorLabel>Requires at least one certification</ErrorLabel>
      )}
      {field.value.map((item: PathValue<T, Path<T>>, id: number) => (
        <ObjectArrayRow key={"cert" + id}>
          <Button
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
            {`Certification ${id + 1}`}
          </Button>
          <ArrayRow>
            <TextInput
              label={"Certificate Name"}
              className={classes.skillTextInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, name: e.target.value };
                field.onChange(current);
              }}
            />
          </ArrayRow>
          <ArrayRow>
            <TextInput
              label={"Issued by"}
              className={classes.skillTextInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, issuedBy: e.target.value };
                field.onChange(current);
              }}
            />
          </ArrayRow>
        </ObjectArrayRow>
      ))}
    </ArrayContainer>
  );
};
