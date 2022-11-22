import React from "react";
import {
  Stepper,
  Button,
  Container,
  Grid,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { ErrorLabel, GridRow, SkillLabel, useStyles } from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { IconX } from "@tabler/icons";
import { ReferencePopup } from "./components/ReferencesPopup";

export const CareerHistoryForm = () => {
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
      skills: [],
      references: [],
      certs: [],
    },
  });

  const { control, getValues, setValue, handleSubmit, formState } =
    careerFormMethods;

  const { skills: currentSkills } = getValues();

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

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

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <Container>
        <GridRow>
          <Grid.Col span={3}>Company Details</Grid.Col>
          <Grid.Col span={5}>
            <Form.TextInput
              control={control}
              label={"Company name"}
              required
              name={"company"}
              mb={35}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ReferencePopup field={"company"} parentControl={control} />
          </Grid.Col>
        </GridRow>
        <GridRow>
          <Grid.Col span={3}>Appointment Details</Grid.Col>
          <Grid.Col span={5}>
            <Form.TextInput
              control={control}
              label={"Position"}
              required
              name={"appointment.position"}
              mb={35}
            />
            <Form.TextInput
              control={control}
              label={"Rank"}
              required
              name={"appointment.rank"}
              mb={35}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ReferencePopup
              field={"appointment.position"}
              parentControl={control}
            />
          </Grid.Col>
        </GridRow>

        <GridRow>
          <Grid.Col span={3}>Skill Sets</Grid.Col>
          <Grid.Col span={5}>
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
          </Grid.Col>
          <Grid.Col span={4}>
            <ReferencePopup
              field={"appointment.position"}
              parentControl={control}
            />
          </Grid.Col>
        </GridRow>

        <GridRow>
          <Grid.Col span={3}>Other details</Grid.Col>
          <Grid.Col span={5}>
            <Form.TextInput
              control={control}
              label={"Last Seen"}
              name={"lastSeen"}
              className={classes.textInput}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ReferencePopup
              field={"appointment.position"}
              parentControl={control}
            />
          </Grid.Col>
        </GridRow>
        <Button>Submit</Button>
      </Container>
    </Form>
  );
};
