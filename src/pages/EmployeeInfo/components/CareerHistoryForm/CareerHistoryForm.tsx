import React from "react";
import { Button } from "@mantine/core";
import { Row, useStyles, MainContainer } from "./styles";
import { useForm, FieldErrorsImpl } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { ReferencePopup } from "./components/ReferencesPopup";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import {
  Appointment,
  AppointmentType,
} from "../../../../model/career/Appointment";
import { PrimitiveArray } from "./components/PrimitiveArray";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const [editMode, setEditMode] = React.useState(true);

  const careerFormMethods = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: {
      company: "",
      appointment: {
        position: "",
        rank: "",
      },
      skills: [],
      references: [],
      certs: [],
      lastDrawnSalary: "",
      duration: "",
    },
  });

  const {
    control: careerControl,
    getValues: careerGetValue,
    setValue: careerSetValue,
    handleSubmit: careerHandleSubmit,
    formState: careerFormState,
    watch: watchCareer,
  } = careerFormMethods;

  const { company: currentCompany, duration: currentDuration } =
    careerGetValue();

  const appointmentFormMethods = useForm<AppointmentType>({
    resolver: zodResolver(Appointment),
    mode: "onChange",
    defaultValues: {
      position: "",
      rank: "",
      references: [],
    },
  });

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const submitFormHandler = careerHandleSubmit(async (data) => {
    console.log(data);
    saveOrCreateCareer(data);
    setDrawer(false);
  });

  const totalErrors = careerFormState.errors as Partial<
    FieldErrorsImpl<{ references_error: { [key: string]: string } }>
  >;

  // console.log(totalErrors);
  console.log(careerGetValue());

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <MainContainer>
        <Row>
          <Form.TextInput
            control={careerControl}
            label={"Company name"}
            name={"company"}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            className={classes.formTextInput}
            required
          />
          {currentCompany.length !== 0 && (
            <ReferencePopup
              key={currentCompany}
              field={"company"}
              content={currentCompany}
              parentControl={careerControl}
              setEditMode={setEditMode}
            />
          )}
        </Row>

        <Row>
          <Form.TextInput
            control={careerControl}
            label={"Duration"}
            name={"duration"}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            className={classes.formTextInput}
          />
          {currentDuration.length !== 0 && (
            <ReferencePopup
              key={currentDuration}
              field={"duration"}
              content={currentDuration}
              parentControl={careerControl}
              setEditMode={setEditMode}
            />
          )}
        </Row>

        <Row>
          <Form.TextInput
            control={careerControl}
            label={"Position"}
            name={"appointment.position"}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            className={classes.formTextInput}
          />
        </Row>

        <Row>
          <Form.TextInput
            control={careerControl}
            label={"Rank"}
            name={"appointment.rank"}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            className={classes.formTextInput}
          />
        </Row>

        <Row>
          <Form.TextInput
            control={careerControl}
            label={"Last Drawn Salary"}
            name={"lastDrawnSalary"}
            disabled={!editMode}
            variant={editMode ? "default" : "unstyled"}
            className={classes.formTextInput}
          />
        </Row>

        <Row>
          <PrimitiveArray />
        </Row>

        <Button mt={20} onClick={submitFormHandler}>
          Add Career
        </Button>
      </MainContainer>
    </Form>
  );
};
