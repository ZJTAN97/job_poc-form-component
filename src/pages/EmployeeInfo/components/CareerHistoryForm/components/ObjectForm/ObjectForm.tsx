import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import { Col, InputRow, useStyles } from "../../styles";
import { ReferencePopup } from "../ReferencesPopup";

interface ObjectForm<T extends FieldValues, K extends FieldValues> {
  parentFormMethods: UseFormReturn<T>;
  childFormMethods: UseFormReturn<K>;
  objectName: Path<T>;
  inputLabels: string[];
  inputNames: Path<K>[];
  requireRefs: boolean[];
  requiredFields: boolean[];
  setEditMode: (arg: boolean) => void;
  editMode: boolean;
}

export const ObjectForm = <T extends FieldValues, K extends FieldValues>({
  parentFormMethods,
  childFormMethods,
  objectName,
  inputLabels,
  inputNames,
  requireRefs,
  requiredFields,
  setEditMode,
  editMode,
}: ObjectForm<T, K>) => {
  const { classes } = useStyles();

  const { control: childControl, getValues: childGetValues } = childFormMethods;
  const { setValue: parentSetValue, formState: parentFormState } =
    parentFormMethods;

  const errorType = parentFormState.errors[objectName] as unknown as {
    [key: string]: { [key: string]: string };
  };

  return (
    <Form
      methods={childFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <Col>
        {inputNames.map((name, id) => (
          <InputRow key={name.toString() + id}>
            <Form.TextInput
              className={classes.formTextInput}
              control={childControl}
              label={inputLabels[id]}
              required={requiredFields[id]}
              name={name}
              disabled={!editMode}
              variant={editMode ? "default" : "unstyled"}
              onBlur={() => {
                parentSetValue(
                  objectName,
                  childGetValues() as PathValue<T, Path<T>>,
                );
              }}
              error={Boolean(errorType) ? errorType[name].message : ""}
            />
            {requireRefs[id] && childGetValues()[name].length !== 0 ? (
              <ReferencePopup
                key={childGetValues()[name]}
                field={"position"}
                content={childGetValues()[name]}
                parentControl={childControl}
                setParentValue={parentSetValue(
                  objectName,
                  childGetValues() as PathValue<T, Path<T>>,
                )}
                setEditMode={setEditMode}
              />
            ) : null}
          </InputRow>
        ))}
      </Col>
    </Form>
  );
};
