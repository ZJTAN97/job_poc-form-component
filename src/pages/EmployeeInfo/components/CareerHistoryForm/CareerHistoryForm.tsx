import React from "react";
import { Button, Popover } from "@mantine/core";
import { Row, useStyles, MainContainer, TitleContainer, Title } from "./styles";
import { useForm, Path } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { StringArrayInput } from "./components/StringArrayInput";
import { ObjectArrayInput } from "./components/ObjectArrayInput";
import { CertificationType } from "../../../../model/career/Certification";
import { SourceType } from "../../../../model/common/Source";
import { AppointmentType } from "../../../../model/career/Appointment";
import { IconEditCircle } from "@tabler/icons";
import {
  ReferenceStateContext,
  useReferencesStateMethods,
} from "./components/References";
import { ReferencesTrigger } from "./components/References/ReferencesTrigger";
import { ReferencesPanel } from "./components/References/ReferencesPanel";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const { saveOrCreateCareer } = useSaveOrCreateCareer();
  const referenceStateMethods = useReferencesStateMethods();
  const {
    openPanel,
    setOpenPanel,
    currentField,
    editMode,
    setEditMode,
    currentArrayId,
    setCurrentArrayId,
  } = referenceStateMethods;

  const [lastSource, setLastSource] = React.useState<SourceType>();

  const [massApplyingFields, setMassApplyingFields] = React.useState<
    {
      field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
      content: string;
    }[]
  >();

  const careerFormMethods = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: {
      company: "",
      appointment: {
        position: "",
        rank: "",
        references: [],
      },
      skills: [],
      references: [],
      certsToField: [],
      lastDrawnSalary: "",
      duration: "",
    },
  });

  const {
    references_company,
    references_position,
    references_skills,
    references_certs,
  } = careerFormMethods.formState.errors as unknown as {
    [key: string]: { message: string };
  };

  const submitFormHandler = careerFormMethods.handleSubmit(async (data) => {
    console.info("[SUCCESS]", data);
    saveOrCreateCareer(data);
    setDrawer(false);
  });

  const handleMassApply = () => {
    if (massApplyingFields === undefined) {
      setMassApplyingFields([]);
      if (currentField === undefined) {
        setEditMode(false);
        setOpenPanel(true);
      }
    } else {
      setMassApplyingFields(undefined);

      if (currentField === undefined) {
        setEditMode(true);
        setOpenPanel(false);
      }
    }
  };

  console.log(careerFormMethods.getValues());

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
      AdditionalContext={ReferenceStateContext}
      additionalContextValues={referenceStateMethods}
    >
      <Popover
        opened={openPanel}
        position="right"
        closeOnClickOutside={false}
        classNames={{ dropdown: classes.dropdown }}
        width={350}
      >
        <ReferencesPanel key={currentField! + currentArrayId} />

        <TitleContainer>
          <Title>Career History</Title>
          <Button
            variant={"subtle"}
            size="xs"
            pl={0}
            mb={10}
            onClick={handleMassApply}
            leftIcon={<IconEditCircle />}
          >
            {massApplyingFields !== undefined
              ? "Exit mass apply"
              : "Mass apply"}
          </Button>
        </TitleContainer>

        <Popover.Target>
          <MainContainer>
            {/* COMPANY */}
            <Row highlight={!editMode && currentField === "company"}>
              <Form.TextInput<CareerType>
                label={"Company name"}
                name={"company"}
                disabled={openPanel}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
                required
              />
              <ReferencesTrigger
                field="company"
                content={careerFormMethods.getValues().company}
                disabled={careerFormMethods.formState.dirtyFields.company}
              />
            </Row>

            {/* DURATION */}
            <Row highlight={!editMode && currentField === "duration"}>
              <Form.TextInput<CareerType>
                label={"Duration"}
                name={"duration"}
                disabled={openPanel}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
              <ReferencesTrigger
                field="duration"
                content={careerFormMethods.getValues().duration}
                disabled={careerFormMethods.formState.dirtyFields.duration}
              />
            </Row>

            {/* LAST DRAWN SALARY*/}
            <Row>
              <Form.TextInput<CareerType>
                label={"Last Drawn Salary"}
                name={"lastDrawnSalary"}
                disabled={openPanel}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
            </Row>

            {/* APPOINTMENT (POSITION, RANK) */}
            <Row highlight={!editMode && currentField === "position"}>
              <Form.TextInput<CareerType>
                label={"Position"}
                name={"appointment.position"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
                required
              />
              <ReferencesTrigger
                field="position"
                content={careerFormMethods.getValues().appointment.position}
                disabled={
                  careerFormMethods.formState.dirtyFields.appointment?.position
                }
              />
            </Row>

            <Row highlight={!editMode && currentField === "rank"}>
              <Form.TextInput<CareerType>
                label={"Rank"}
                name={"appointment.rank"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
                required={true}
              />
              <ReferencesTrigger
                field="rank"
                content={careerFormMethods.getValues().appointment.rank}
                disabled={
                  careerFormMethods.formState.dirtyFields.appointment?.rank
                }
              />
            </Row>

            {/* SKILLS  */}
            <StringArrayInput<CareerType>
              name="skills"
              editMode={editMode}
              referenceTrigger={(arrId) => (
                <ReferencesTrigger
                  field="skills"
                  content={careerFormMethods.getValues().skills[arrId]}
                  disabled={
                    careerFormMethods.getValues().skills[arrId].length > 1
                  }
                  arrId={arrId}
                />
              )}
              currentName={currentField}
              currentArrayId={currentArrayId}
              massApplyingFields={massApplyingFields}
            />

            {/* CERTS  */}
            <ObjectArrayInput<CareerType, CertificationType>
              name="certsToField"
              editMode={editMode}
              emptyObject={{
                name: "",
                issuedBy: "",
                references: [],
              }}
              referenceTrigger={(arrId, name) => (
                <ReferencesTrigger
                  field={name}
                  content={
                    name === "issuedBy"
                      ? careerFormMethods.getValues().certsToField[arrId]
                          .issuedBy
                      : careerFormMethods.getValues().certsToField[arrId].name
                  }
                  disabled={
                    name === "issuedBy"
                      ? careerFormMethods.getValues().certsToField[arrId]
                          .issuedBy.length > 1
                      : careerFormMethods.getValues().certsToField[arrId].name
                          .length > 1
                  }
                  arrId={arrId}
                />
              )}
              currentArrayId={currentArrayId}
              currentName={currentField}
              massApplyingFields={massApplyingFields}
            />

            <Button
              ml={15}
              mt={20}
              onClick={submitFormHandler}
              disabled={!editMode}
              variant={"light"}
            >
              Add Career
            </Button>
          </MainContainer>
        </Popover.Target>
      </Popover>
    </Form>
  );
};
