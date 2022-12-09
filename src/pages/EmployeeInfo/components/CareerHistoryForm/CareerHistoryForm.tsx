import React from "react";
import { Button, Popover } from "@mantine/core";
import { Row, useStyles, MainContainer } from "./styles";
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
  >("company");
  const [currentArrayId, setCurrentArrayId] = React.useState(0);

  const [lastSource, setLastSource] = React.useState<SourceType>();

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

  // console.log("--careerForm--");
  // console.log(careerFormMethods.getValues());

  const contentEditAfterAddedRef = (val: string) => {
    if (
      careerFormMethods
        .getValues()
        .references.filter((ref) => ref.field === "company").length === 1
    ) {
      console.log(val);
      // not sure if this is the best way
    }
  };

  return (
    <Form
      methods={careerFormMethods}
      preventLeaving={true}
      useLocalStorage={true}
    >
      <Popover
        opened={isOpenPopover}
        position="right"
        closeOnClickOutside={false}
        classNames={{ dropdown: classes.dropdown }}
        width={350}
      >
        <ReferencePopup
          key={
            currentName +
            currentArrayId +
            careerFormMethods.getValues().toString()
          }
          currentName={currentName}
          setIsOpenPopover={setIsOpenPopover}
          setEditMode={setEditMode}
          lastSource={lastSource}
          setLastSource={setLastSource}
          currentArrayId={currentArrayId}
        />
        <Popover.Target>
          <MainContainer>
            {/* COMPANY */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
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
              />
            </Row>

            {/* DURATION */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
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
              />
            </Row>

            {/* LAST DRAWN SALARY*/}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
                label={"Last Drawn Salary"}
                name={"lastDrawnSalary"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
            </Row>

            {/* APPOINTMENT (POSITION, RANK) */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
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
                content={careerFormMethods.getValues().appointment.position}
                currentName={currentName}
                setCurrentName={setCurrentName}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={
                  careerFormMethods.getValues().appointment.position.length < 1
                }
                error={references_position?.message}
              />
            </Row>

            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
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
                  careerFormMethods.getValues().appointment.rank.length < 1
                }
              />
            </Row>

            {/* SKILLS  */}
            <Row>
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
                  />
                )}
              />
            </Row>

            {/* CERTS  */}
            <Row>
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
                        : careerFormMethods.getValues().certsToField[id].name
                    }
                    currentName={currentName}
                    setCurrentName={setCurrentName}
                    setIsOpenPopover={setIsOpenPopover}
                    setEditMode={setEditMode}
                    setCurrentArrayId={setCurrentArrayId}
                    objArrId={id}
                    error={references_certs?.message}
                  />
                )}
              />
            </Row>

            <Button mt={20} onClick={submitFormHandler} disabled={!editMode}>
              Add Career
            </Button>
          </MainContainer>
        </Popover.Target>
      </Popover>
    </Form>
  );
};
