import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, Popover } from "@mantine/core";
import { Form } from "../../../../components/Form";
import {
  GetReferenceTypeKey,
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../data/common/Reference";
import { Career, CareerType } from "../../../../data/career/CareerHistory";
import { MultiField } from "./components/MultiField";
import { AppointmentType } from "../../../../data/career/Appointment";
import { SingleField } from "./components/SingleField";
import { GroupRow } from "./components/GroupRow";
import { FlattenObject } from "../../../../utils/FlattenObject";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
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
      lastSeen: "",
    },
  });

  const {
    control: careerFormControl,
    getValues: careerFormGetValues,
    setValue: careerFormSetValues,
    formState: careerFormState,
  } = careerFormMethods;

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: "",
      content: "",
      comments: "",
      dateObtained: "",
      referenceType: TYPES_OF_REFERENCES.FACEBOOK,
    },
  });

  const {
    control: referenceFormControl,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  const [singleValueFieldSelected, setSingleValueFieldSelected] =
    React.useState<(keyof CareerType)[]>([]);

  const [openReferenceWindow, setOpenReferenceWindow] = React.useState(false);

  const toggleEditMode = () => {
    setSingleValueFieldSelected(
      Object.keys(
        FlattenObject(careerFormState.dirtyFields),
      ) as (keyof CareerType)[],
    );
    setEditMode(!editMode);
    setOpenReferenceWindow(!openReferenceWindow);
  };

  const applyReferencesToSelectedFields = referenceFormHandleSubmit(
    async (data) => {
      singleValueFieldSelected.forEach((item) => {
        // can use typeof, check between primitives and objects
        const isSingleObjectType = item.split(".").length === 2;
        if (isSingleObjectType) {
          const objArr = item.split(".") as (keyof CareerType)[];
          const appointmentObj = careerFormGetValues()[
            objArr[0]
          ] as AppointmentType;
          const fieldItem = appointmentObj[objArr[1] as keyof AppointmentType];
          careerFormSetValues("references", [
            ...careerFormGetValues().references,
            {
              ...data,
              referenceType: GetReferenceTypeKey(data.referenceType),
              content: fieldItem,
              field: item,
            },
          ]);
        } else {
          careerFormSetValues("references", [
            ...careerFormGetValues().references,
            {
              ...data,
              referenceType: GetReferenceTypeKey(data.referenceType),
              content: careerFormGetValues()[item] as string,
              field: item,
            },
          ]);
        }
      });
      setOpenReferenceWindow(false);
      setEditMode(true);
    },
  );

  const appendSkills = (skill: string) => {
    careerFormSetValues("skills", [...careerFormGetValues().skills, skill]);
  };

  const appendReferences = (data: ReferenceType) => {
    careerFormSetValues("references", [
      ...careerFormGetValues().references,
      data,
    ]);
  };

  const filteredSkillsReferences = React.useMemo(
    () =>
      careerFormGetValues().references.filter(
        (item) => item.field === "skills",
      ),
    [careerFormGetValues().references],
  );

  return (
    <Popover
      opened={openReferenceWindow}
      position={"right-start"}
      withArrow
      arrowOffset={150}
      arrowSize={20}
    >
      <Popover.Target>
        <div className={styles.popover__target}>
          <Form
            methods={careerFormMethods}
            preventLeaving={true}
            useLocalStorage={false}
          >
            <div className={styles.container__col}>
              <h2 className={styles.header}>Career History</h2>
              <GroupRow groupName="Company Details">
                <SingleField
                  editMode={editMode}
                  parentControl={careerFormControl}
                  label={"Name of Company"}
                  name={"company"}
                  currentValue={careerFormGetValues().company}
                  reference={
                    careerFormGetValues().references.filter(
                      (item) => item.field === "company",
                    )[0]
                  }
                />
              </GroupRow>
              <GroupRow groupName="Appointment Details">
                <SingleField
                  editMode={editMode}
                  parentControl={careerFormControl}
                  label={"Position"}
                  name={"appointment.position"}
                  currentValue={careerFormGetValues().appointment.position}
                  reference={
                    careerFormGetValues().references.filter(
                      (item) => item.field === "appointment.position",
                    )[0]
                  }
                />
                <SingleField
                  editMode={editMode}
                  parentControl={careerFormControl}
                  label={"Rank"}
                  name={"appointment.rank"}
                  currentValue={careerFormGetValues().appointment.rank}
                  reference={
                    careerFormGetValues().references.filter(
                      (item) => item.field === "appointment.rank",
                    )[0]
                  }
                />
              </GroupRow>

              <MultiField
                title={"Skill Set"}
                data={careerFormGetValues().skills}
                references={filteredSkillsReferences}
                appliedField={"skills"}
                appendHandler={appendSkills}
                appendReference={appendReferences}
              />
              <GroupRow groupName="Last Seen Details">
                <SingleField
                  editMode={editMode}
                  parentControl={careerFormControl}
                  label={"Last Seen"}
                  name={"lastSeen"}
                  currentValue={careerFormGetValues().lastSeen}
                  reference={
                    careerFormGetValues().references.filter(
                      (item) => item.field === "lastSeen",
                    )[0]
                  }
                />
              </GroupRow>
              <div>{/* TODO: MultiObject component For Certificates */}</div>
            </div>
          </Form>
          <div className={styles.add__button}>
            <Button variant="white" size="xs" onClick={() => setDrawer(false)}>
              Cancel
            </Button>
            <Button
              variant="white"
              size="xs"
              onClick={toggleEditMode}
              disabled={
                Object.keys(FlattenObject(careerFormState.dirtyFields)).length <
                3
              }
            >
              Add references
            </Button>
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div className={styles.popover__container}>
          <h5>Apply references to Fields</h5>
          <MultiSelect
            label={"Apply references to fields"}
            name={"field"}
            className={styles.dropdowns}
            data={["company", "appointment.position", "appointment.rank"]}
            maxDropdownHeight={200}
            onChange={(arr: any) => setSingleValueFieldSelected(arr)}
            value={singleValueFieldSelected}
          />
          <Form.Dropdown
            label={"Reference Type"}
            control={referenceFormControl}
            name={"referenceType"}
            className={styles.dropdowns}
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            label={"Comments"}
            name={"comments"}
            control={referenceFormControl}
            className={styles.dropdowns}
          />
          <Form.TextInput
            label={"Date of Origin"}
            name={"dateObtained"}
            control={referenceFormControl}
            className={styles.dropdowns}
          />

          <Button
            className={styles.apply__button}
            onClick={applyReferencesToSelectedFields}
          >
            Apply
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
