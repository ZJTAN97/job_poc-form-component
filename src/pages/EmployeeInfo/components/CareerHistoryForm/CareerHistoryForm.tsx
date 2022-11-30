import React from "react";
import { Button, Popover, Textarea } from "@mantine/core";
import { Row, useStyles, MainContainer, AddRefButton } from "./styles";
import { useForm, Path } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { ReferencePopup } from "./components/ReferencesPopup";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { PrimitiveArray } from "./components/PrimitiveArray";
import { TYPES_OF_REFERENCES } from "../../../../model/common/Source";
import { ReferenceTrigger } from "./components/ReferenceTrigger";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const [editMode, setEditMode] = React.useState(true);

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

  careerFormMethods.watch();

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const submitFormHandler = careerFormMethods.handleSubmit(async (data) => {
    console.log(data);
    saveOrCreateCareer(data);
    setDrawer(false);
  });

  const [isOpenPopover, setIsOpenPopover] = React.useState(false);
  const [selectedRefOption, setSelectedRefOption] =
    React.useState<Path<CareerType>>();

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
          },
        }}
      >
        <Popover.Target>
          <MainContainer>
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
                selectedRefOption={selectedRefOption}
                setSelectedRefOption={setSelectedRefOption}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={careerFormMethods.getValues().company.length < 1}
              />
            </Row>

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
                selectedRefOption={selectedRefOption}
                setSelectedRefOption={setSelectedRefOption}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={careerFormMethods.getValues().duration.length < 1}
              />
            </Row>

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
                selectedRefOption={selectedRefOption}
                setSelectedRefOption={setSelectedRefOption}
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
                selectedRefOption={selectedRefOption}
                setSelectedRefOption={setSelectedRefOption}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={
                  careerFormMethods.getValues().appointment.rank.length < 1
                }
              />
            </Row>

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
                selectedRefOption={selectedRefOption}
                setSelectedRefOption={setSelectedRefOption}
                setIsOpenPopover={setIsOpenPopover}
                setEditMode={setEditMode}
                disabled={
                  careerFormMethods.getValues().lastDrawnSalary.length < 1
                }
              />
            </Row>

            <Row>
              <PrimitiveArray
                isOpenPopover={isOpenPopover}
                setIsOpenPopover={setIsOpenPopover}
                setSelectedRefOption={setSelectedRefOption}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </Row>

            <Button mt={20} onClick={submitFormHandler}>
              Add Career
            </Button>
          </MainContainer>
        </Popover.Target>
        <ReferencePopup
          key={selectedRefOption}
          selectedRef={selectedRefOption}
          setIsOpenPopover={setIsOpenPopover}
          setEditMode={setEditMode}
        />
      </Popover>
    </Form>
  );
};
