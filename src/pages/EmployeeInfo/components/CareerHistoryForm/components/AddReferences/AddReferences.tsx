import { Container, Grid } from "@mantine/core";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CareerType } from "../../../../../../model/career/Career";
import { ReferencePopup } from "../ReferencesPopup";
import { CurrentValue, Label } from "./styles";

interface AddReferencesProps {
  formMethods: UseFormReturn<CareerType>;
}

export const AddReferences = ({ formMethods }: AddReferencesProps) => {
  const { control, getValues } = formMethods;

  const {
    appointment: currentAppointment,
    company: currentCompany,
    skills: currentSkills,
  } = getValues();

  console.warn("[WARNING] Rerender cause: AddReferences Component");

  return (
    <Container>
      {currentCompany.length > 0 && (
        <>
          <Label>Company</Label>
          <Grid>
            <Grid.Col span={7}>
              <CurrentValue>{currentCompany}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={4}>
              <ReferencePopup field={"company"} parentControl={control} />
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentAppointment.position.length > 0 && (
        <>
          <Label>Position</Label>
          <Grid>
            <Grid.Col span={7}>
              <CurrentValue>{currentAppointment.position}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={4}>
              <ReferencePopup
                field={"appointment.position"}
                parentControl={control}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentAppointment.rank.length > 0 && (
        <>
          <Label>Rank</Label>
          <Grid>
            <Grid.Col span={7}>
              <CurrentValue>{currentAppointment.rank}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={4}>
              <ReferencePopup
                field={"appointment.rank"}
                parentControl={control}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentSkills.length > 0 && <Label>Skill Sets</Label>}
      {currentSkills.map((skill) => (
        <Grid key={skill}>
          <Grid.Col span={7}>
            <CurrentValue>{skill}</CurrentValue>
          </Grid.Col>
          <Grid.Col span={4}>
            <ReferencePopup field={"skills"} parentControl={control} />
          </Grid.Col>
        </Grid>
      ))}
    </Container>
  );
};
