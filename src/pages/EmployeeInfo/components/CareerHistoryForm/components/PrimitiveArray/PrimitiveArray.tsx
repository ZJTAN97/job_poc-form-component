import { Button, TextInput } from "@mantine/core";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CareerType } from "../../../../../../model/career/Career";
import { Label, MainContainer, Row, useStyles } from "./styles";

export const PrimitiveArray = () => {
  const { classes } = useStyles();

  const parentForm = useFormContext<CareerType>();

  const [currentSkills, setCurrentSkills] = React.useState<string[]>([]);

  const handleOnChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let data = [...currentSkills];
    data[id] = e.target.value;
    setCurrentSkills(data);
  };

  const handleAddSkill = () => {
    setCurrentSkills([...currentSkills, ""]);
  };

  const removeSkill = (id: number) => {
    let data = [...currentSkills];
    data.splice(id, 1);
    setCurrentSkills(data);
  };

  return (
    <MainContainer>
      <Row>
        <Label>Skills</Label>
        <Button variant="light" size="xs" onClick={handleAddSkill}>
          Add more
        </Button>
      </Row>
      {currentSkills.map((skill, id) => (
        <TextInput
          key={id}
          label={`Skill #${id + 1}`}
          className={classes.formTextInput}
          rightSection={
            <Button size="xs" variant="light" onClick={() => removeSkill(id)}>
              Delete
            </Button>
          }
          onChange={(e) => handleOnChange(id, e)}
          value={skill}
          rightSectionWidth={75}
          onBlur={() => parentForm.setValue("skills", currentSkills)}
        />
      ))}
    </MainContainer>
  );
};
