import { Button, TextInput } from "@mantine/core";
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { ReferencesTrigger } from "../References/ReferencesTrigger";
import { ArrayContainer, ArrayRow, useStyles } from "./styles";

type GenericObject<TForm extends FieldValues> = {
  value: {
    [key: string]: string;
  };
  references: [];
} & FieldArrayWithId<TForm, ArrayPath<TForm>>;

interface ArrayInputProps<TForm extends FieldValues> {
  name: ArrayPath<TForm>;
  defaultValue: GenericObject<TForm>;
}

export const ArrayInput = <TForm extends FieldValues>({
  name,
  defaultValue,
}: ArrayInputProps<TForm>) => {
  const { classes } = useStyles();
  const formMethods = useFormContext<TForm>();

  const { fields, ...arrayMethods } = useFieldArray({
    control: formMethods.control,
    name,
  });

  return (
    <ArrayContainer>
      <Button
        variant="light"
        size="xs"
        ml={15}
        onClick={() =>
          arrayMethods.append(
            defaultValue as FieldArray<TForm, ArrayPath<TForm>>,
          )
        }
      >
        Add {name.charAt(0).toUpperCase() + name.slice(1)}
      </Button>
      {fields.map((val, id: number) => (
        <div key={"wrapper_" + id}>
          {Object.keys((val as unknown as GenericObject<TForm>).value).map(
            (key) => (
              <ArrayRow key={"array_input_" + id + key}>
                <TextInput
                  label={`${key.charAt(0).toUpperCase() + key.slice(1)} #${
                    id + 1
                  }`}
                  value={
                    (val as unknown as GenericObject<TForm>).value[
                      name.slice(0, -1)
                    ]
                  }
                  className={classes.skillTextInput}
                  onChange={(e) => {
                    const copy = { ...val } as unknown as GenericObject<TForm>;
                    copy.value[key] = e.target.value;
                    arrayMethods.update(id, copy);
                  }}
                />
                <ReferencesTrigger field="skills" />
              </ArrayRow>
            ),
          )}
        </div>
      ))}
    </ArrayContainer>
  );
};
