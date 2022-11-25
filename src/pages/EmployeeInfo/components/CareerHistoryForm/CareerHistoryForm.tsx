import React from "react";
import { Button, ActionIcon, TextInput } from "@mantine/core";
import {
  ErrorLabel,
  Row,
  SkillLabel,
  Col,
  ColTitle,
  InputRow,
  useStyles,
  MainContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { IconX } from "@tabler/icons";
import { ReferencePopup } from "./components/ReferencesPopup";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { NestedArrayObjectForm } from "./components/NestedArrayObjectForm";
import { ObjectForm } from "./components/ObjectForm";
import {
  Appointment,
  AppointmentType,
} from "../../../../model/career/Appointment";

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

  watchCareer("skills");

  const {
    skills: currentSkills,
    company: currentCompany,
    duration: currentDuration,
  } = careerGetValue();

  const appointmentFormMethods = useForm<AppointmentType>({
    resolver: zodResolver(Appointment),
    mode: "onChange",
    defaultValues: {
      position: "",
      rank: "",
      references: [],
    },
  });

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

  const appendToSkillArray = () => {
    careerSetValue("skills", [...currentSkills, currentSkillTextInput]);
    setCurrentSkillTextInput("");
    setShowAddSkill(false);
  };

  const removeFromSkillArray = (skill: string) => {
    careerSetValue(
      "skills",
      currentSkills.filter((item) => item !== skill),
    );
  };

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const submitFormHandler = careerHandleSubmit(async (data) => {
    saveOrCreateCareer(data);
    setDrawer(false);
  });

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <MainContainer>
        <Row>
          <ColTitle>Company Details</ColTitle>
          <Col>
            <InputRow>
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
            </InputRow>
          </Col>
        </Row>

        <Row>
          <ColTitle>Other details</ColTitle>
          <Col>
            <InputRow>
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
            </InputRow>
            <Form.TextInput
              control={careerControl}
              label={"Last Drawn Salary"}
              name={"lastDrawnSalary"}
              disabled={!editMode}
              variant={editMode ? "default" : "unstyled"}
              className={classes.formTextInput}
            />
          </Col>
        </Row>

        <Row>
          <ColTitle>Skill Sets</ColTitle>
          <Col>
            {currentSkills.map((skill, id) => (
              <InputRow key={skill + id}>
                <SkillLabel>
                  {skill}
                  <ActionIcon
                    pb={6}
                    ml={5}
                    onClick={() => removeFromSkillArray(skill)}
                  >
                    <IconX size={10} />
                  </ActionIcon>
                </SkillLabel>
                <ReferencePopup
                  setEditMode={setEditMode}
                  field={"skills"}
                  content={skill}
                  parentControl={careerControl}
                />
              </InputRow>
            ))}
            <ErrorLabel>
              {careerFormState.errors.skills &&
                careerFormState.errors.skills.message}
            </ErrorLabel>
            {showAddSkill ? (
              <TextInput
                value={currentSkillTextInput}
                className={classes.formTextInput}
                onChange={(e) => setCurrentSkillTextInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") appendToSkillArray();
                }}
                rightSection={
                  <Button
                    disabled={currentSkillTextInput.length === 0}
                    size="xs"
                    variant="light"
                    onClick={appendToSkillArray}
                  >
                    Add
                  </Button>
                }
                rightSectionWidth={60}
              />
            ) : (
              <Button
                size="xs"
                variant="light"
                onClick={() => setShowAddSkill(true)}
              >
                Add skills
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <ColTitle>Appointment Details</ColTitle>
          <ObjectForm<CareerType, AppointmentType>
            parentFormMethods={careerFormMethods}
            childFormMethods={appointmentFormMethods}
            objectName={"appointment"}
            inputLabels={["Position", "Rank"]}
            inputNames={["position", "rank"]}
            requireRefs={[true, false]}
            requiredFields={[true, true]}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        </Row>

        <NestedArrayObjectForm parentFormMethods={careerFormMethods} />

        <Button mt={20} onClick={submitFormHandler}>
          Add Career
        </Button>
      </MainContainer>
    </Form>
  );
};
