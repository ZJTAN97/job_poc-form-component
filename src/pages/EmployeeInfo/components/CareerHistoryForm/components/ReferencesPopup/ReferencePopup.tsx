import { Button, Popover } from "@mantine/core";
import React from "react";
import {
  AddRef,
  AddReferenceTrigger,
  ButtonGroup,
  ReferenceHeader,
  useStyles,
} from "./styles";
import { useForm, useFieldArray, Control } from "react-hook-form";
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../../../components/Form";
import {
  Source,
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../model/common/Source";

interface ReferencePopupProps {
  field: string;
  parentControl: Control<any>;
  setParentValue?: any;
  content: string;
  setEditMode: (arg: boolean) => void;
}

export const ReferencePopup = ({
  field,
  content,
  parentControl,
  setParentValue,
  setEditMode,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const [open, setOpen] = React.useState(false);

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      content,
      field,
      sources: [],
    },
  });

  const {
    control: referenceControl,
    handleSubmit: referenceHandleSubmit,
    getValues: referencesGetValues,
  } = referenceFormMethods;

  const sourceFormMethods = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "Default",
      dateObtained: "2022-11-11T12:19:54.52",
      referenceType: TYPES_OF_REFERENCES.LINKED_IN,
    },
  });

  const { control: sourceControl, handleSubmit: sourceHandleSubmit } =
    sourceFormMethods;

  const {
    append: referencesAppend,
    update: referencesUpdate,
    remove: referencesRemove,
  } = useFieldArray({
    control: parentControl,
    name: "references",
  });

  const {
    append: sourcesAppend,
    update: sourcesUpdate,
    remove: sourcesRemove,
  } = useFieldArray({
    control: referenceControl,
    name: "sources",
  });

  const existingReference = React.useMemo(() => {
    const numberOfSources = referencesGetValues().sources.length;
    if (numberOfSources === 1) {
      return `${referencesGetValues().sources[0].referenceType} | ${
        referencesGetValues().sources[0].comment
      } | ${referencesGetValues().sources[0].dateObtained}`;
    } else if (numberOfSources > 1) {
      return `${referencesGetValues().sources[0].referenceType} | ${
        referencesGetValues().sources[0].comment
      } | ${referencesGetValues().sources[0].dateObtained} + ${
        numberOfSources - 1
      } more sources`;
    }
    return "";
  }, [referencesGetValues().sources]);

  const appendReference = sourceHandleSubmit(async (sourceData) => {
    sourcesAppend(sourceData);
    if (existingReference.length > 0) {
      referencesUpdate(0, referencesGetValues());
    } else {
      referencesAppend(referencesGetValues());
    }
    if (setParentValue) setParentValue();
    setOpen(false);
    setEditMode(true);
  });

  return (
    <Popover
      width={200}
      position="right"
      withArrow
      shadow="md"
      closeOnClickOutside
      closeOnEscape
      onClose={() => {
        setOpen(false);
        setEditMode(true);
      }}
      opened={open}
    >
      <Popover.Target>
        <AddReferenceTrigger
          onClick={() => {
            setEditMode(false);
            setOpen(true);
          }}
        >
          {existingReference ? (
            <AddRef>{existingReference}</AddRef>
          ) : (
            <AddRef>Add References</AddRef>
          )}
        </AddReferenceTrigger>
      </Popover.Target>
      <Popover.Dropdown>
        <ReferenceHeader>Add References</ReferenceHeader>
        <Form
          methods={sourceFormMethods}
          preventLeaving={false}
          useLocalStorage={false}
        >
          <Form.Dropdown
            label={"Reference Type"}
            control={sourceControl}
            name="referenceType"
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            className={classes.formTextInput}
            label="Comments"
            name="comment"
            control={sourceControl}
          />
          <Form.TextInput
            className={classes.formTextInput}
            label="Date obtained"
            name="dateObtained"
            control={sourceControl}
          />
        </Form>
        <ButtonGroup>
          <Button
            variant="default"
            size="xs"
            onClick={() => {
              setOpen(false);
              setEditMode(true);
            }}
          >
            Cancel
          </Button>
          <Button size="xs" onClick={appendReference}>
            Apply
          </Button>
        </ButtonGroup>
      </Popover.Dropdown>
    </Popover>
  );
};
