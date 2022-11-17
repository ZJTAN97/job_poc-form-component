import { Button, Flex, Popover } from "@mantine/core";
import React from "react";
import {
  AddReferenceTrigger,
  ButtonGroup,
  ReferenceHeader,
  useStyles,
} from "./styles";
import { useForm, useFieldArray, Control } from "react-hook-form";
import {
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../data/common/Reference";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../../../components/Form";
import { CareerType } from "../../../../../../data/career/CareerHistory";

interface ReferencePopupProps {
  field: string;
  parentControl: Control<CareerType>;
}

export const ReferencePopup = ({
  field,
  parentControl,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const [open, setOpen] = React.useState(false);

  const { fields, update, append, remove } = useFieldArray({
    control: parentControl,
    name: "references",
  });

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      comments: "",
      content: "",
      dateObtained: "",
      field,
      referenceType: TYPES_OF_REFERENCES.REDDIT,
    },
  });

  const { control, handleSubmit } = referenceFormMethods;

  const existingReference = React.useMemo(() => {
    const filtered = fields.find((item) => item.field === field);
    if (filtered) {
      const { referenceType, comments, dateObtained } = filtered;
      return `${referenceType} | ${comments} | ${dateObtained}`;
    }
    return undefined;
  }, [fields]);

  const appendReference = handleSubmit(async (data) => {
    if (existingReference) {
      const filtered = fields.find((item) => item.field === field);
      if (filtered) update(fields.indexOf(filtered), data);
    } else {
      append(data);
    }
    setOpen(false);
  });

  console.warn("[WARNING] Rerender cause: ReferencePopup Component");

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
      withinPortal={true}
    >
      <Popover.Target>
        <AddReferenceTrigger onClick={() => setOpen(true)}>
          {existingReference ? existingReference : "Add references"}
        </AddReferenceTrigger>
      </Popover.Target>
      <Popover.Dropdown>
        <ReferenceHeader>Add References</ReferenceHeader>
        <Form
          methods={referenceFormMethods}
          preventLeaving={false}
          useLocalStorage={false}
        >
          <Form.Dropdown
            label={"Reference Type"}
            control={control}
            name="referenceType"
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            className={classes.formTextInput}
            label="Comments"
            name="comments"
            control={control}
          />
          <Form.TextInput
            className={classes.formTextInput}
            label="Date obtained"
            name="dateObtained"
            control={control}
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
