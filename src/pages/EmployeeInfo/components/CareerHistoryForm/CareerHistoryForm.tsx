import React from "react";
import { Button, Container, ActionIcon, TextInput } from "@mantine/core";
import { ErrorLabel, Row, SkillLabel, Col, ColTitle } from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { IconX } from "@tabler/icons";
import { ReferencePopup } from "./components/ReferencesPopup";

export const CareerHistoryForm = () => {
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

  const { control, getValues, setValue, handleSubmit, formState } =
    careerFormMethods;

  const { skills: currentSkills } = getValues();

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

  const [showAddCert, setShowAddCert] = React.useState(false);

  const appendToSkillArray = () => {
    setValue("skills", [...currentSkills, currentSkillTextInput]);
    setCurrentSkillTextInput("");
    setShowAddSkill(false);
  };

  const removeFromSkillArray = (skill: string) => {
    console.log("skill to remove: " + skill);
    setValue(
      "skills",
      currentSkills.filter((item) => item !== skill),
    );
  };

  const submitFormHandler = handleSubmit(async (data) => {
    console.log(data);
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
              control={control}
              label={"Company name"}
              required
              name={"company"}
              mb={35}
              rightSection={
                <ReferencePopup field={"company"} parentControl={control} />
              }
            />
          </Col>
        </Row>
        <Row>
          <ColTitle>Appointment Details</ColTitle>
          <Col>
            <Form.TextInput
              control={control}
              label={"Position"}
              required
              name={"appointment.position"}
              mb={20}
              rightSection={
                <ReferencePopup
                  field={"appointment.position"}
                  parentControl={control}
                />
              }
            />
            <Form.TextInput
              control={control}
              label={"Rank"}
              required
              name={"appointment.rank"}
              rightSection={
                <ReferencePopup
                  field={"appointment.position"}
                  parentControl={control}
                />
              }
            />
          </Col>
        </Row>

        <Row>
          <ColTitle>Skill Sets</ColTitle>
          <Col>
            {currentSkills.map((skill, id) => (
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
            ))}
            <ErrorLabel>
              {formState.errors.skills && formState.errors.skills.message}
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

        <Row>
          <ColTitle>Other details</ColTitle>
          <Col>
            <Form.TextInput
              control={control}
              label={"Last Drawn Salary"}
              name={"lastDrawnSalary"}
              mb={25}
              rightSection={
                <ReferencePopup
                  field={"lastDrawnSalary"}
                  parentControl={control}
                />
              }
            />
            <Form.TextInput
              control={control}
              label={"Duration"}
              name={"duration"}
              rightSection={
                <ReferencePopup field={"duration"} parentControl={control} />
              }
            />
          </Col>
        </Row>

        <Row>
          <ColTitle>Certification</ColTitle>
          <Col>
            {showAddCert ? (
              <>
                <Form.TextInput
                  control={control}
                  label={"Name"}
                  mb={25}
                  rightSection={
                    <ReferencePopup
                      field={"certification"}
                      parentControl={control}
                    />
                  }
                />
                <Form.TextInput
                  control={control}
                  label={"Issued By"}
                  rightSection={
                    <ReferencePopup
                      field={"certification"}
                      parentControl={control}
                    />
                  }
                />
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => setShowAddCert(false)}
                  mt={25}
                >
                  Add
                </Button>
              </>
            ) : (
              <Button
                size="xs"
                variant="light"
                onClick={() => setShowAddCert(true)}
              >
                Add Certifications
              </Button>
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
