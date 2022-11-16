import { Container, Grid } from "@mantine/core";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CareerType } from "../../../../../../data/career/CareerHistory";
import { ReferenceType } from "../../../../../../data/common/Reference";
import { ReferencePopup } from "../ReferencesPopup";
import { CurrentValue, Label } from "./styles";

interface AddReferencesProps {
  formMethods: UseFormReturn<CareerType>;
}

export const AddReferences = ({ formMethods }: AddReferencesProps) => {
  const { control, getValues, setValue, watch } = formMethods;

  const {
    appointment: currentAppointment,
    company: currentCompany,
    lastSeen: currentLastSeen,
    references: currentReferences,
    skills: currentSkills,
  } = getValues();

  const companyReference = React.useMemo(() => {
    const filteredReference = currentReferences.find(
      (item) => item.field === "company",
    );
    if (filteredReference) {
      const { referenceType, comments, dateObtained } = filteredReference;
      return `${referenceType} | ${comments} | ${dateObtained}`;
    }
    return undefined;
  }, [watch()]);

  const positionReference = React.useMemo(() => {
    const filteredReference = currentReferences.find(
      (item) => item.field === "appointment.position",
    );
    if (filteredReference) {
      const { referenceType, comments, dateObtained } = filteredReference;
      return `${referenceType} | ${comments} | ${dateObtained}`;
    }
    return undefined;
  }, [watch()]);

  return (
    <Container>
      {currentCompany.length > 0 && (
        <>
          <Label>Company</Label>
          <Grid>
            <Grid.Col span={8}>
              <CurrentValue>{currentCompany}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={3}>
              <ReferencePopup
                field={"company"}
                setParentFormValue={setValue}
                existingReference={companyReference}
                existingReferences={currentReferences}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentAppointment.position.length > 0 && (
        <>
          <Label>Position</Label>
          <Grid>
            <Grid.Col span={8}>
              <CurrentValue>{currentAppointment.position}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={3}>
              <ReferencePopup
                field={"appointment.position"}
                setParentFormValue={setValue}
                existingReference={positionReference}
                existingReferences={currentReferences}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentAppointment.rank.length > 0 && (
        <>
          <Label>Rank</Label>
          <Grid>
            <Grid.Col span={8}>
              <CurrentValue>{currentAppointment.rank}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={3}>
              {/* <ReferencePopup field={"appointment.rank"} /> */}
            </Grid.Col>
          </Grid>
        </>
      )}
      {currentSkills.length > 0 && <Label>Skill Sets</Label>}
      {currentSkills.map((skill) => (
        <Grid key={skill}>
          <Grid.Col span={8}>
            <CurrentValue>{skill}</CurrentValue>
          </Grid.Col>
          <Grid.Col span={3}>
            {/* <ReferencePopup field={"skills"} /> */}
          </Grid.Col>
        </Grid>
      ))}
      {currentLastSeen.length > 0 && (
        <>
          <Label>Last Seen</Label>
          <Grid>
            <Grid.Col span={8}>
              <CurrentValue>{currentLastSeen}</CurrentValue>
            </Grid.Col>
            <Grid.Col span={3}>
              {/* <ReferencePopup field={"lastSeen"} /> */}
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
};
