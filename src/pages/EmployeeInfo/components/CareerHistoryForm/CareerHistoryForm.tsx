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

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const [editMode, setEditMode] = React.useState(true);
  const [isOpenPopover, setIsOpenPopover] = React.useState(false);
  const [currentName, setCurrentName] =
    React.useState<Path<CareerType>>("company");

  const careerFormMethods = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: {
      company: "",
      appointment: {
        position: "",
        rank: "",
      },
      skills: [],
      references: [],
      certs: [],
      lastDrawnSalary: "",
      duration: "",
    },
  });

  const { dirtyFields } = careerFormMethods.formState;

  const submitFormHandler = careerFormMethods.handleSubmit(async (data) => {
    console.info("[SUCCESS]", data);
    // saveOrCreateCareer(data);
    // setDrawer(false);
  });

  // console.log("--current selected name--");
  // console.log(currentName);

  console.log("--careerForm--");
  console.log(careerFormMethods.getValues());

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
        width={320}
        styles={{
          dropdown: {
            height: "-webkit-fill-available",
            border: "none",
            borderLeft: "solid 1px #dfdfdf",
            minHeight: "95vh",
          },
        }}
      >
        <ReferencePopup
          key={
            currentName +
            careerFormMethods
              .getValues()
              [currentName as keyof CareerType].toString()
          }
          content={careerFormMethods
            .getValues()
            [currentName as keyof CareerType].toString()}
          currentName={currentName}
          setIsOpenPopover={setIsOpenPopover}
          setEditMode={setEditMode}
        />
        <Popover.Target>
          <MainContainer>
            {/* Company Name */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
                label={"Company name"}
                name={"company"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
                required
              />
              <ReferenceTrigger<CareerType>
                isOpenPopover={isOpenPopover}
                name={"company"}
                content={careerFormMethods.getValues().company}
                currentName={currentName}
                setCurrentName={setCurrentName}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={!dirtyFields.company}
              />
            </Row>

            {/* Duration */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
                label={"Duration"}
                name={"duration"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
              <ReferenceTrigger<CareerType>
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

            {/* Last Drawn Salary */}
            <Row>
              <Form.TextInput
                control={careerFormMethods.control}
                label={"Last Drawn Salary"}
                name={"lastDrawnSalary"}
                disabled={!editMode}
                variant={editMode ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
              <ReferenceTrigger<CareerType>
                isOpenPopover={isOpenPopover}
                name={"lastDrawnSalary"}
                content={careerFormMethods.getValues().lastDrawnSalary}
                currentName={currentName}
                setCurrentName={setCurrentName}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={
                  careerFormMethods.getValues().lastDrawnSalary.length < 1
                }
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
              <ReferenceTrigger<CareerType>
                isOpenPopover={isOpenPopover}
                name={"appointment.position"}
                content={careerFormMethods.getValues().appointment.position}
                currentName={currentName}
                setCurrentName={setCurrentName}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={
                  careerFormMethods.getValues().appointment.position.length < 1
                }
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
              <ReferenceTrigger<CareerType>
                isOpenPopover={isOpenPopover}
                name={"appointment.rank"}
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
                rightSection={(id) => (
                  <ReferenceTrigger<CareerType>
                    isOpenPopover={isOpenPopover}
                    name={"skills"}
                    content={careerFormMethods.getValues().skills[id] || ""}
                    currentName={"skills"}
                    setCurrentName={setCurrentName}
                    setIsOpenPopover={setIsOpenPopover}
                    setEditMode={setEditMode}
                  />
                )}
              />
            </Row>

            {/* Certs  */}
            <Row>
              <ObjectArrayInput<CareerType, CertificationType>
                name="certs"
                objectKeys={["name", "issuedBy"]}
                editMode={editMode}
              />
            </Row>

            <Button mt={20} onClick={submitFormHandler}>
              Add Career
            </Button>
          </MainContainer>
        </Popover.Target>
      </Popover>
    </Form>
  );
};
