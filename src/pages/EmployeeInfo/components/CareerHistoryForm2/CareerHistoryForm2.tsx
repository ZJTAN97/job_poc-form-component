import React from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { useStyles } from "./styles";
import { EditContent } from "./components/EditContent";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../data/career/CareerHistory";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddReferences } from "./components/AddReferences";
import { Form } from "../../../../components/Form";

export const CareerHistoryForm2 = () => {
  const { classes } = useStyles();

  const careerFormMethods = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: {
      company: "",
      appointment: {
        position: "",
        rank: "",
      },
      lastSeen: "",
      skills: [],
      references: [],
    },
  });

  const { handleSubmit } = careerFormMethods;

  const [active, setActive] = React.useState(0);

  const nextStep = handleSubmit(async (data) => {
    console.log("[INFO] Current Form: ");
    console.log(data);
    setActive((current) => (current < 3 ? current + 1 : current));
  });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        classNames={{
          root: classes.stepperStyles,
          stepLabel: classes.stepLabel,
          content: classes.stepBody,
        }}
      >
        <Stepper.Step label="Edit Career History">
          <EditContent formMethods={careerFormMethods} />
        </Stepper.Step>
        <Stepper.Step label="Add References">
          <AddReferences formMethods={careerFormMethods} />
        </Stepper.Step>
        <Stepper.Step label="Preview & Update">Preview</Stepper.Step>
        <Stepper.Completed>Your changes has been updated</Stepper.Completed>
      </Stepper>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Form>
  );
};
