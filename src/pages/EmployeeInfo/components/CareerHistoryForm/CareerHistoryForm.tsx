import React from "react";
import { Button, Popover, TextInput } from "@mantine/core";
import { Row, useStyles, MainContainer, TitleContainer, Title } from "./styles";
import { useForm, Path } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { ReferencePopup } from "./components/ReferencesPopup";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { ReferenceTrigger } from "./components/ReferenceTrigger";
import { StringArrayInput } from "./components/StringArrayInput";
import { ObjectArrayInput } from "./components/ObjectArrayInput";
import { CertificationType } from "../../../../model/career/Certification";
import { SourceType } from "../../../../model/common/Source";
import { AppointmentType } from "../../../../model/career/Appointment";
import { IconEditCircle } from "@tabler/icons";
import { ReferencesProvider, ReferencesContext } from "./components/References";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const [editMode, setEditMode] = React.useState(true);
  const [isOpenPopover, setIsOpenPopover] = React.useState(false);
  const [currentName, setCurrentName] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState(0);
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

  const { dirtyFields } = careerFormMethods.formState;

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

  const contentEditAfterAddedRef = (val: string) => {
    if (
      careerFormMethods
        .getValues()
        .references.filter((ref) => ref.field === "company").length === 1
    ) {
      console.log("-- to be updated --");
      console.log(val);
    }
  };

  const handleMassApply = () => {
    console.log(currentName);

    if (massApplyingFields === undefined) {
      setMassApplyingFields([]);
      if (currentName === undefined) {
        setEditMode(false);
        setIsOpenPopover(true);
      }
    } else {
      setMassApplyingFields(undefined);

      if (currentName === undefined) {
        setEditMode(true);
        setIsOpenPopover(false);
      }
    }
  };

  // console.log("--careerForm--");
  // console.log(careerFormMethods.getValues());

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <ReferencesProvider>
        <ReferencesContext.Consumer>
          {({ openPanel }) => (
            <>
              <ReferencesProvider.Panel />
              <ReferencesProvider.Trigger<CareerType> fieldName={"company"} />
              <TextInput disabled={openPanel} />
              <Popover
                opened={isOpenPopover}
                position="right"
                closeOnClickOutside={false}
                classNames={{ dropdown: classes.dropdown }}
                width={350}
              >
                <ReferencePopup
                  key={
                    currentName! +
                    currentArrayId +
                    careerFormMethods.getValues().toString()
                  }
                  currentName={currentName}
                  setCurrentName={setCurrentName}
                  setIsOpenPopover={setIsOpenPopover}
                  setEditMode={setEditMode}
                  lastSource={lastSource}
                  setLastSource={setLastSource}
                  currentArrayId={currentArrayId}
                  massApplyingFields={massApplyingFields}
                  setMassApplyingFields={setMassApplyingFields}
                />

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
                    <Row
                      highlight={
                        (!editMode && currentName === "company") ||
                        massApplyingFields?.filter(
                          (item) =>
                            item.field === "company" &&
                            item.content ===
                              careerFormMethods.getValues().company,
                        ).length === 1
                      }
                    >
                      <Form.TextInput
                        label={"Company name"}
                        name={"company"}
                        disabled={!editMode}
                        variant={editMode ? "default" : "unstyled"}
                        className={classes.formTextInput}
                        onChange={contentEditAfterAddedRef}
                        required
                      />
                      <ReferenceTrigger
                        isOpenPopover={isOpenPopover}
                        name={"company"}
                        content={careerFormMethods.getValues().company}
                        currentName={currentName}
                        setCurrentName={setCurrentName}
                        setIsOpenPopover={setIsOpenPopover}
                        setEditMode={setEditMode}
                        disabled={!dirtyFields.company}
                        error={references_company?.message}
                        massApplyingFields={massApplyingFields}
                        setMassApplyingFields={setMassApplyingFields}
                      />
                    </Row>

                    {/* DURATION */}
                    <Row
                      highlight={
                        (!editMode && currentName === "duration") ||
                        massApplyingFields?.filter(
                          (item) =>
                            item.field === "duration" &&
                            item.content ===
                              careerFormMethods.getValues().duration,
                        ).length === 1
                      }
                    >
                      <Form.TextInput
                        label={"Duration"}
                        name={"duration"}
                        disabled={!editMode}
                        variant={editMode ? "default" : "unstyled"}
                        className={classes.formTextInput}
                      />
                      <ReferenceTrigger
                        isOpenPopover={isOpenPopover}
                        name={"duration"}
                        content={careerFormMethods.getValues().duration}
                        currentName={currentName}
                        setCurrentName={setCurrentName}
                        setIsOpenPopover={setIsOpenPopover}
                        setEditMode={setEditMode}
                        disabled={!dirtyFields.duration}
                        massApplyingFields={massApplyingFields}
                        setMassApplyingFields={setMassApplyingFields}
                      />
                    </Row>

                    {/* LAST DRAWN SALARY*/}
                    <Row>
                      <Form.TextInput
                        label={"Last Drawn Salary"}
                        name={"lastDrawnSalary"}
                        disabled={!editMode}
                        variant={editMode ? "default" : "unstyled"}
                        className={classes.formTextInput}
                      />
                    </Row>

                    {/* APPOINTMENT (POSITION, RANK) */}
                    <Row
                      highlight={
                        (!editMode && currentName === "position") ||
                        massApplyingFields?.filter(
                          (item) =>
                            item.field === "position" &&
                            item.content ===
                              careerFormMethods.getValues().appointment
                                .position,
                        ).length === 1
                      }
                    >
                      <Form.TextInput
                        label={"Position"}
                        name={"appointment.position"}
                        disabled={!editMode}
                        variant={editMode ? "default" : "unstyled"}
                        className={classes.formTextInput}
                        required
                      />
                      <ReferenceTrigger
                        isOpenPopover={isOpenPopover}
                        name={"position"}
                        content={
                          careerFormMethods.getValues().appointment.position
                        }
                        currentName={currentName}
                        setCurrentName={setCurrentName}
                        setIsOpenPopover={setIsOpenPopover}
                        setEditMode={setEditMode}
                        disabled={
                          careerFormMethods.getValues().appointment.position
                            .length < 1
                        }
                        error={references_position?.message}
                        massApplyingFields={massApplyingFields}
                        setMassApplyingFields={setMassApplyingFields}
                      />
                    </Row>

                    <Row
                      highlight={
                        (!editMode && currentName === "rank") ||
                        massApplyingFields?.filter(
                          (item) =>
                            item.field === "rank" &&
                            item.content ===
                              careerFormMethods.getValues().appointment.rank,
                        ).length === 1
                      }
                    >
                      <Form.TextInput
                        label={"Rank"}
                        name={"appointment.rank"}
                        disabled={!editMode}
                        variant={editMode ? "default" : "unstyled"}
                        className={classes.formTextInput}
                        required={true}
                      />
                      <ReferenceTrigger
                        isOpenPopover={isOpenPopover}
                        name={"rank"}
                        content={careerFormMethods.getValues().appointment.rank}
                        currentName={currentName}
                        setCurrentName={setCurrentName}
                        setIsOpenPopover={setIsOpenPopover}
                        setEditMode={setEditMode}
                        disabled={
                          careerFormMethods.getValues().appointment.rank
                            .length < 1
                        }
                        massApplyingFields={massApplyingFields}
                        setMassApplyingFields={setMassApplyingFields}
                      />
                    </Row>

                    {/* SKILLS  */}
                    <StringArrayInput<CareerType>
                      name="skills"
                      editMode={editMode}
                      referenceTrigger={(id) => (
                        <ReferenceTrigger
                          isOpenPopover={isOpenPopover}
                          name={"skills"}
                          content={careerFormMethods.getValues().skills[id]}
                          currentName={currentName}
                          setCurrentName={setCurrentName}
                          setIsOpenPopover={setIsOpenPopover}
                          setEditMode={setEditMode}
                          disabled={
                            careerFormMethods.getValues().skills[id].length < 1
                          }
                          setCurrentArrayId={setCurrentArrayId}
                          objArrId={id}
                          error={references_skills?.message}
                          massApplyingFields={massApplyingFields}
                          setMassApplyingFields={setMassApplyingFields}
                        />
                      )}
                      currentName={currentName}
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
                      referenceTrigger={(id, name) => (
                        <ReferenceTrigger
                          isOpenPopover={isOpenPopover}
                          name={name}
                          content={
                            name === "issuedBy"
                              ? careerFormMethods.getValues().certsToField[id]
                                  .issuedBy
                              : careerFormMethods.getValues().certsToField[id]
                                  .name
                          }
                          currentName={currentName}
                          setCurrentName={setCurrentName}
                          setIsOpenPopover={setIsOpenPopover}
                          setEditMode={setEditMode}
                          setCurrentArrayId={setCurrentArrayId}
                          objArrId={id}
                          error={references_certs?.message}
                          disabled={
                            name === "issuedBy"
                              ? careerFormMethods.getValues().certsToField[id]
                                  .issuedBy.length < 1
                              : careerFormMethods.getValues().certsToField[id]
                                  .name.length < 1
                          }
                          massApplyingFields={massApplyingFields}
                          setMassApplyingFields={setMassApplyingFields}
                        />
                      )}
                      currentArrayId={currentArrayId}
                      currentName={currentName}
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
            </>
          )}
        </ReferencesContext.Consumer>
      </ReferencesProvider>
    </Form>
  );
};
