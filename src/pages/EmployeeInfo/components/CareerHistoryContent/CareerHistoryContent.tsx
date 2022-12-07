import { Loader, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../model/career/Appointment";
import { CareerType } from "../../../../model/career/Career";
import { CertificationType } from "../../../../model/career/Certification";
import { useQuerySelectedCareerData } from "../../../../react-query/career";
import {
  ContentBlock,
  ContentInfo,
  ContentLabel,
  FieldBlock,
  MainContainer,
  ReferenceBlock,
  TitleBlock,
  useStyles,
} from "./styles";

interface CareerHistoryContentProps {
  currentId: string;
}

export const CareerHistoryContent = ({
  currentId,
}: CareerHistoryContentProps) => {
  const { classes } = useStyles();

  const { career, isLoadingCareer } = useQuerySelectedCareerData(currentId);

  const getStringReferences = (
    name: Path<CareerType> | Path<CertificationType> | Path<AppointmentType>,
    content: string,
  ) => {
    if (career) {
      const allReferences = [
        ...career.references,
        ...career.appointment.references,
        ...career.certsToField.map((cert) => cert.references).flat(),
      ];

      const sources = allReferences.filter(
        (ref) => ref.field === name && ref.content === content,
      )[0].sources;

      const firstSource = `${sources[0].referenceType} | ${sources[0].comment} | ${sources[0].dateObtained}`;

      return (
        firstSource +
        (sources.length > 1 ? "+ " + (sources.length - 1) + " more" : "")
      );
    }
    return "none";
  };

  return (
    <MainContainer>
      {!career || isLoadingCareer ? (
        <Loader />
      ) : (
        <>
          <TitleBlock>
            <Text>Career Information</Text>
            <IconEdit className={classes.icon} />
          </TitleBlock>

          <FieldBlock>
            <ContentLabel>Company Name</ContentLabel>
            <ContentBlock>
              <ContentInfo>{career.company}</ContentInfo>
              <ReferenceBlock>
                {getStringReferences("company", career.company)}
              </ReferenceBlock>
            </ContentBlock>
          </FieldBlock>

          <FieldBlock>
            <ContentLabel>Duration</ContentLabel>
            <ContentBlock>
              <ContentInfo>{career.duration}</ContentInfo>
              <ReferenceBlock>
                {getStringReferences("duration", career.duration)}
              </ReferenceBlock>
            </ContentBlock>
          </FieldBlock>

          <FieldBlock>
            <ContentLabel>Last Drawn Salary</ContentLabel>
            <ContentBlock>
              <ContentInfo>{career.lastDrawnSalary}</ContentInfo>
            </ContentBlock>
          </FieldBlock>

          <FieldBlock>
            <ContentLabel>Appointment</ContentLabel>
            <ContentBlock>
              <ContentInfo>{career.appointment.position}</ContentInfo>
              <ReferenceBlock>
                {getStringReferences("position", career.appointment.position)}
              </ReferenceBlock>
            </ContentBlock>
            <ContentBlock>
              <ContentInfo>{career.appointment.rank}</ContentInfo>
              <ReferenceBlock>
                {getStringReferences("rank", career.appointment.rank)}
              </ReferenceBlock>
            </ContentBlock>
          </FieldBlock>

          <FieldBlock>
            <ContentLabel>Skills</ContentLabel>
            {career.skills.map((skill, id) => (
              <ContentBlock key={"skill_source_" + id}>
                <ContentInfo>{skill}</ContentInfo>
                <ReferenceBlock>
                  {getStringReferences("skills", skill)}
                </ReferenceBlock>
              </ContentBlock>
            ))}
          </FieldBlock>

          <FieldBlock>
            <ContentLabel>Certifications</ContentLabel>
            {career.certsToField.map((cert, id) => (
              <div key={"cert_source_" + id} style={{ marginTop: "15px" }}>
                <ContentBlock>
                  <ContentInfo>Name: {cert.name}</ContentInfo>
                  <ReferenceBlock>
                    {getStringReferences("name", cert.name)}
                  </ReferenceBlock>
                </ContentBlock>
                <ContentBlock key={"cert_source_" + id}>
                  <ContentInfo>Issued by: {cert.issuedBy}</ContentInfo>
                  <ReferenceBlock>
                    {getStringReferences("issuedBy", cert.issuedBy)}
                  </ReferenceBlock>
                </ContentBlock>
              </div>
            ))}
          </FieldBlock>
        </>
      )}
    </MainContainer>
  );
};
