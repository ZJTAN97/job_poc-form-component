import React from "react";
import { Button, Container, ActionIcon, TextInput } from "@mantine/core";
import { ErrorLabel, Row, SkillLabel, Col, ColTitle } from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { IconX } from "@tabler/icons";
import { ReferencePopup } from "./components/ReferencesPopup";
import {
  CertificationType,
  Certification,
} from "../../../../model/career/Certification";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { NestedObjectForm } from "./components/NestedObjectForm";

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
  } = careerFormMethods;

  const certFormMethods = useForm<CertificationType>({
    resolver: zodResolver(Certification),
    mode: "onChange",
    defaultValues: {
      issuedBy: "",
      name: "",
      references: [],
    },
  });

  const {
    control: certControl,
    setValue: certSetValue,
    handleSubmit: certHandleSubmit,
  } = certFormMethods;

  const {
    skills: currentSkills,
    certs: currentCerts,
    company: currentCompany,
    duration: currentDuration,
  } = careerGetValue();

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

  const [showAddCert, setShowAddCert] = React.useState(false);

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

  const certSubmitHandler = certHandleSubmit(async (data) => {
    careerSetValue("certs", [...currentCerts, data]);
    certSetValue("issuedBy", "");
    certSetValue("name", "");
    setShowAddCert(false);
  });

  const submitFormHandler = careerHandleSubmit(async (data) => {
    console.log(data);
    saveOrCreateCareer(data);
    // setDrawer(false);
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
            <Form.TextInput
              control={careerControl}
              label={"Company name"}
              required
              name={"company"}
              mb={35}
              rightSection={
                <ReferencePopup
                  key={currentCompany}
                  field={"company"}
                  content={currentCompany}
                  parentControl={careerControl}
                />
              }
            />
          </Col>
        </Row>

        <Row>
          <ColTitle>Other details</ColTitle>
          <Col>
            <Form.TextInput
              control={careerControl}
              label={"Last Drawn Salary"}
              name={"lastDrawnSalary"}
              mb={25}
            />
            <Form.TextInput
              control={careerControl}
              label={"Duration"}
              name={"duration"}
              rightSection={
                <ReferencePopup
                  key={currentDuration}
                  field={"duration"}
                  content={currentDuration}
                  parentControl={careerControl}
                />
              }
            />
          </Col>
        </Row>

        <Row>
          <ColTitle>Skill Sets*</ColTitle>
          <Col>
            {currentSkills.map((skill, id) => (
              <Row key={skill.toString() + id}>
                <SkillLabel key={skill + id}>
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
              </Row>
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
                Add Skills
              </Button>
            )}
          </Col>
        </Row>

        <NestedObjectForm parentFormMethods={careerFormMethods} />

        <Row>
          <ColTitle>Certification</ColTitle>
          <Col>
            {showAddCert ? (
              <>
                <Form.TextInput
                  control={certControl}
                  label={"Name"}
                  name={"name"}
                  mb={25}
                  rightSection={
                    <ReferencePopup
                      field={"name"}
                      content={""}
                      parentControl={careerControl}
                    />
                  }
                />
                <Form.TextInput
                  control={certControl}
                  label={"Issued By"}
                  name={"issuedBy"}
                  rightSection={
                    <ReferencePopup
                      field={"issuedBy"}
                      content={""}
                      parentControl={careerControl}
                    />
                  }
                />
                <Button
                  size="xs"
                  variant="light"
                  onClick={certSubmitHandler}
                  mt={25}
                >
                  Add
                </Button>
              </>
            ) : (
              <>
                {currentCerts.map((cert, id) => (
                  <div key={cert.toString() + id}>
                    <div>{cert.name}</div>
                    <div>{cert.issuedBy}</div>
                  </div>
                ))}
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => setShowAddCert(true)}
                >
                  Add Certifications
                </Button>
              </>
            )}
          </Col>
        </Row>

        <Button mt={20} onClick={submitFormHandler}>
          Add Career
        </Button>
      </Container>
    </Form>
  );
};
