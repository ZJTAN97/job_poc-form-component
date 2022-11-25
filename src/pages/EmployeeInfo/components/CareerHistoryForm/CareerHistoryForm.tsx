import React from "react";
import { Button, Container, ActionIcon, TextInput } from "@mantine/core";
import {
  ErrorLabel,
  Row,
  SkillLabel,
  Col,
  ColTitle,
  InputRow,
  InputRowRef,
} from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { IconX } from "@tabler/icons";
import { ReferencePopup } from "./components/ReferencesPopup";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { NestedObjectForm } from "./components/NestedObjectForm";
import { NestedArrayObjectForm } from "./components/NestedArrayObjectForm";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
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

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

  const appendToSkillArray = () => {
    careerSetValue("skills", [...currentSkills, currentSkillTextInput]);
    setCurrentSkillTextInput("");
    setShowAddSkill(false);
  };

  const removeFromSkillArray = (skill: string) => {
    console.log("skill to remove: " + skill);
    careerSetValue(
      "skills",
      currentSkills.filter((item) => item !== skill),
    );
  };

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const submitFormHandler = careerHandleSubmit(async (data) => {
    console.log(data);
    saveOrCreateCareer(data);
    setDrawer(false);
  });

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <Container mb={50}>
        <Row>
          <ColTitle>Company Details</ColTitle>
          <Col>
            <InputRow>
              <Form.TextInput
                styles={{
                  root: {
                    width: "100%",
                  },
                }}
                control={careerControl}
                label={"Company name"}
                required
                name={"company"}
                mb={35}
              />
              <InputRowRef>
                <ReferencePopup
                  key={currentCompany}
                  field={"company"}
                  content={currentCompany}
                  parentControl={careerControl}
                />
              </InputRowRef>
            </InputRow>
          </Col>
        </Row>

        <Row>
          <ColTitle>Other details</ColTitle>
          <Col>
            <InputRow>
              <Form.TextInput
                styles={{
                  root: {
                    width: "100%",
                    maxWidth: "355px",
                  },
                }}
                control={careerControl}
                label={"Duration"}
                name={"duration"}
                width={800}
              />
              <InputRowRef>
                <ReferencePopup
                  key={currentDuration}
                  field={"duration"}
                  content={currentDuration}
                  parentControl={careerControl}
                />
              </InputRowRef>
            </InputRow>
            <Form.TextInput
              styles={{
                root: {
                  width: "100%",
                  maxWidth: "355px",
                },
              }}
              control={careerControl}
              label={"Last Drawn Salary"}
              name={"lastDrawnSalary"}
              mb={25}
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

        <NestedObjectForm parentFormMethods={careerFormMethods} />

        <NestedArrayObjectForm parentFormMethods={careerFormMethods} />

        <Button mt={20} onClick={submitFormHandler}>
          Add Career
        </Button>
      </Container>
    </Form>
  );
};
