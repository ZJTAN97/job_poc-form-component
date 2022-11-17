import React from "react";
import { ErrorLabel, GridRow, SkillLabel, useStyles } from "./styles";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import { CareerType } from "../../../../../../data/career/CareerHistory";
import { ActionIcon, Button, Container, Grid, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons";

interface EditContentProps {
  formMethods: UseFormReturn<CareerType>;
}

export const EditContent = ({ formMethods }: EditContentProps) => {
  const { classes } = useStyles();

  const { control, getValues, setValue, watch, formState } = formMethods;
  watch("skills");

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

  console.warn("[WARNING] Rerender cause: EditContent Component");

  return (
    <Container>
      <GridRow m="lg">
        <Grid.Col span={4}>Company Details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Company name"}
            required
            name={"company"}
            className={classes.textInput}
          />
        </Grid.Col>
      </GridRow>

      <GridRow>
        <Grid.Col span={4}>Appointment Details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Position"}
            required
            name={"appointment.position"}
            className={classes.textInput}
          />
          <Form.TextInput
            control={control}
            label={"Rank"}
            required
            name={"appointment.rank"}
            className={classes.textInput}
          />
        </Grid.Col>
      </GridRow>

      <GridRow>
        <Grid.Col span={4}>Skill Sets</Grid.Col>
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
      </GridRow>

      <GridRow>
        <Grid.Col span={4}>Other details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Last Seen"}
            name={"lastSeen"}
            className={classes.textInput}
          />
        </Grid.Col>
      </GridRow>
    </Container>
  );
};
