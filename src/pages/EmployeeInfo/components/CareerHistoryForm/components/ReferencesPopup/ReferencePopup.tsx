import { Button, Flex, Popover } from "@mantine/core";
import React from "react";
import { AddReferenceTrigger, ReferenceHeader, useStyles } from "./styles";
import { useForm, UseFormSetValue } from "react-hook-form";
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
  existingReference?: string;
  existingReferences: ReferenceType[];
  setParentFormValue: UseFormSetValue<CareerType>;
}

export const ReferencePopup = ({
  field,
  existingReference,
  existingReferences,
  setParentFormValue,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const [open, setOpen] = React.useState(false);

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

  const appendReference = handleSubmit(async (data) => {
    console.log(data);
    setParentFormValue("references", [...existingReferences, data]);
    setOpen(false);
  });

  return (
    <Popover
      opened={open}
      width={200}
      position="right-start"
      withArrow
      shadow="md"
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
        <Flex
          mih={50}
          gap="xl"
          justify="space-around"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button variant="default" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={appendReference}>
            Apply
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
