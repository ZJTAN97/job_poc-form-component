import React from "react";
import { useStyles } from "./styles";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import { CareerType } from "../../../../../../data/career/CareerHistory";
import { Box, Button, Grid, TextInput } from "@mantine/core";

interface EditContentProps {
  formMethods: UseFormReturn<CareerType>;
}

export const EditContent = ({ formMethods }: EditContentProps) => {
  const { classes } = useStyles();

  const { control, getValues, setValue } = formMethods;

  const {
    skills: currentSkills,
    appointment: currentAppointment,
    company: currentCompany,
    lastSeen: currentLastSeen,
  } = getValues();

  const [showAddSkill, setShowAddSkill] = React.useState(false);
  const [currentSkillTextInput, setCurrentSkillTextInput] = React.useState("");

  const appendSkillArray = () => {
    setValue("skills", [...currentSkills, currentSkillTextInput]);
    setCurrentSkillTextInput("");
    setShowAddSkill(false);
  };

  return (
    <>
      <Box className={classes.header}>Career History</Box>
      <Grid className={classes.groupLabel}>
        <Grid.Col span={4}>Company Details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Company name"}
            name={"company"}
            className={classes.textInput}
          />
        </Grid.Col>
      </Grid>

      <Grid className={classes.groupLabel}>
        <Grid.Col span={4}>Appointment Details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Position"}
            name={"appointment.position"}
            className={classes.textInput}
          />
          <Form.TextInput
            control={control}
            label={"Rank"}
            name={"appointment.rank"}
            className={classes.textInput}
          />
        </Grid.Col>
      </Grid>

      <Grid className={classes.groupLabel}>
        <Grid.Col span={4}>Skill Sets</Grid.Col>
        <Grid.Col span={5}>
          {currentSkills.map((skill) => (
            <Box key={skill} className={classes.skillItem}>
              {skill}
            </Box>
          ))}
          {showAddSkill ? (
            <TextInput
              value={currentSkillTextInput}
              onChange={(e) => setCurrentSkillTextInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") appendSkillArray();
              }}
              rightSection={
                <Button size="xs" variant="light" onClick={appendSkillArray}>
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
      </Grid>

      <Grid className={classes.groupLabel}>
        <Grid.Col span={4}>Other details</Grid.Col>
        <Grid.Col span={7}>
          <Form.TextInput
            control={control}
            label={"Last Seen"}
            name={"lastSeen"}
            className={classes.textInput}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};
