import { Button, Popover } from "@mantine/core";
import React from "react";
import {
  AddReferenceTrigger,
  ButtonGroup,
  ReferenceHeader,
  useStyles,
} from "./styles";
import {
  useForm,
  useFieldArray,
  Control,
  UseFormSetValue,
} from "react-hook-form";
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
import { IconInfoCircle } from "@tabler/icons";

interface ReferencePopupProps {
  field: string;
  parentControl: Control<any>;
  setParentValue?: any;
  content: string;
}

export const ReferencePopup = ({
  field,
  content,
  parentControl,
  setParentValue,
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

  const { append: referencesAppend, remove: referencesRemove } = useFieldArray({
    control: parentControl,
    name: "references",
  });

  const { append: sourcesAppend, remove: sourcesRemove } = useFieldArray({
    control: referenceControl,
    name: "sources",
  });

  const existingReference = React.useMemo(() => {
    if (referencesGetValues().sources.length > 0) {
      return `${referencesGetValues().sources[0].referenceType} | ${
        referencesGetValues().sources[0].comment
      } | ${referencesGetValues().sources[0].dateObtained}`;
    }
    return "";
  }, [referencesGetValues().sources]);

  const appendReference = sourceHandleSubmit(async (sourceData) => {
    sourcesAppend(sourceData);
    referencesAppend(referencesGetValues());
    if (setParentValue) setParentValue();

    setOpen(false);
  });

  // TODO: Optimize this component rendering
  // console.warn("[WARNING] Rerender cause: ReferencePopup Component");

  return (
    <Popover
      width={200}
      position="right"
      withArrow
      shadow="md"
      closeOnClickOutside
      closeOnEscape
      onClose={() => setOpen(false)}
      opened={open}
    >
      <Popover.Target>
        <AddReferenceTrigger onClick={() => setOpen(true)}>
          {existingReference ? existingReference : <IconInfoCircle />}
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
          <Button variant="default" size="xs" onClick={() => setOpen(false)}>
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
