import { Button, TextInput } from "@mantine/core";
import React from "react";
import { useFormContext, Path } from "react-hook-form";
import { CareerType } from "../../../../../../model/career/Career";
import { MainContainer, Row, useStyles } from "./styles";
import { IconCirclePlus, IconX } from "@tabler/icons";
import { ReferenceTrigger } from "../ReferenceTrigger";

// TODO: make this generic

interface PrimitiveArrayProps {
  isOpenPopover: boolean;
  setIsOpenPopover: (arg: boolean) => void;
  setSelectedRefOption: (arg: Path<CareerType>) => void;
  editMode: boolean;
  setEditMode: (arg: boolean) => void;
}

export const PrimitiveArray = ({
  setSelectedRefOption,
  isOpenPopover,
  setIsOpenPopover,
  editMode,
  setEditMode,
}: PrimitiveArrayProps) => {
  const careerFormMethods = useFormContext<CareerType>();

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
    parentForm.setValue("skills", data);
  };

  return (
    <MainContainer>
      <Row>
        <Button
          p={0}
          mb={10}
          rightIcon={<IconCirclePlus />}
          variant="subtle"
          size="lg"
          onClick={handleAddSkill}
          color={"black"}
          disabled={!editMode}
        >
          Skills
        </Button>
      </Row>
      {currentSkills.map((skill, id) => (
        <Row key={id}>
          <TextInput
            label={`Skill #${id + 1}`}
            className={classes.formTextInput}
            rightSection={<IconX size={20} onClick={() => removeSkill(id)} />}
            onChange={(e) => handleOnChange(id, e)}
            value={skill}
            rightSectionWidth={35}
            disabled={!editMode}
            onBlur={() => parentForm.setValue("skills", currentSkills)}
          />
          <ReferenceTrigger<CareerType>
            isOpenPopover={isOpenPopover}
            name={"skills"}
            selectedRefOption={"skills"}
            setSelectedRefOption={setSelectedRefOption}
            setIsOpenPopover={setIsOpenPopover}
            setEditMode={setEditMode}
            disabled={careerFormMethods.getValues().appointment.rank.length < 1}
          />
        </Row>
      ))}
    </MainContainer>
  );
};
