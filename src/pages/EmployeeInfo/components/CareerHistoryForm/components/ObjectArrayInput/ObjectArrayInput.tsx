import { Button, TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { useReferenceStateContext } from "../References/References";
import { ReferencesTrigger } from "../References/ReferencesTrigger";
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
  /** To set empty objects when adding input fields on UI */
  emptyObject: K;
}

export const ObjectArrayInput = <T extends FieldValues, K extends FieldValues>({
  name,
  emptyObject,
}: ObjectArrayInputProps<T, K>) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const { openPanel, currentArrayId, currentField, massAppliedFields } =
    referenceStateContext;

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
        <Title disabled={openPanel}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Title>
        <IconCirclePlus
          color={openPanel ? "rgb(0 0 0 / 30%)" : "black"}
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
            disabled={openPanel}
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
              (openPanel && currentField === "name" && currentArrayId === id) ||
              massAppliedFields.filter(
                (item) => item.field === "name" && item.arrayId === id,
              ).length === 1
            }
          >
            <TextInput
              value={field.value[id].name}
              label={"Certificate Name"}
              className={classes.textInput}
              disabled={openPanel}
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
            <ReferencesTrigger
              field={"name"}
              disabled={field.value[id].name.length > 0}
              arrId={id}
            />
          </ArrayRow>
          <ArrayRow
            highlight={
              (openPanel &&
                currentField === "issuedBy" &&
                currentArrayId === id) ||
              massAppliedFields.filter(
                (item) => item.field === "issuedBy" && item.arrayId === id,
              ).length === 1
            }
          >
            <TextInput
              value={field.value[id].issuedBy}
              label={"Issued by"}
              className={classes.textInput}
              disabled={openPanel}
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
            <ReferencesTrigger
              field={"issuedBy"}
              disabled={field.value[id].issuedBy.length > 0}
              arrId={id}
            />
          </ArrayRow>
        </ObjectArrayRow>
      ))}
    </ArrayContainer>
  );
};
