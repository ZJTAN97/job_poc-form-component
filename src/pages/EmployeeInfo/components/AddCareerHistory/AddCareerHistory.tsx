import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, Popover } from "@mantine/core";
import { SingleField } from "../SingleField";
import { Form } from "../../../../components/Form";
import {
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../data/common/Reference";
import { Career, CareerType } from "../../../../data/career/CareerHistory";
import { SingleObject } from "../SingleObject";
import { AppointmentType } from "../../../../data/career/Appointment";

export const AddCareerHistory = () => {
  const [editMode, setEditMode] = React.useState(true);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setOpenReferenceWindow(!openReferenceWindow);
  };

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
      certs: [],
      references: [],
    },
  });

  const {
    control: careerFormControl,
    watch: careerFormWatch,
    getValues: careerFormGetValues,
    setValue: careerFormSetValues,
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

  const [apply, setApply] = React.useState(false);

  const applyReferencesToSelectedFields = referenceFormHandleSubmit(
    async (data) => {
      setApply(true);
      singleValueFieldSelected.forEach((item) => {
        console.log(item);
        console.log(careerFormGetValues()[item]);

        careerFormSetValues("references", [
          ...careerFormGetValues().references,
          {
            ...data,
            content: careerFormGetValues()[item] as string,
            field: item,
          },
        ]);
      });
      setOpenReferenceWindow(false);
    },
  );

  careerFormWatch();

  // console.log("[INFO] Career Form State: ");
  // console.log(careerFormWatch());

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
              <SingleField
                editMode={editMode}
                parentControl={careerFormControl}
                label={"Name of Company"}
                name={"company"}
                groupName={"Company Details"}
                currentValue={careerFormGetValues().company}
                selected={singleValueFieldSelected.includes("company")}
                apply={apply}
                setParentReferences={careerFormSetValues}
                reference={
                  careerFormGetValues().references.filter(
                    (item) => item.field === "company",
                  )[0]
                }
              />
              <SingleObject<AppointmentType>
                editMode={editMode}
                names={["position", "rank"]}
                parentControl={careerFormControl}
                labels={["Position", "Rank"]}
                groupName={"Appointment Details"}
                existingReferences={careerFormGetValues().references}
                currentValues={careerFormGetValues().appointment}
              />

              <div>{/* TODO: MultiObject component For Certificates */}</div>
            </div>
          </Form>
          <div className={styles.add__button}>
            <Button variant="white" size="xs">
              Cancel
            </Button>
            <Button variant="white" size="xs" onClick={toggleEditMode}>
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
            data={["company"]}
            // data={["company", "appointment.position", "appointment.rank"]}
            maxDropdownHeight={200}
            onChange={(arr: any) => setSingleValueFieldSelected(arr)}
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

{
  /* <MultiField
                title={"Skill Set"}
                data={careerFormGetValues().skills}
                references={filteredSkillsReferences}
                appliedField={"skills"}
                appendHandler={appendSkills}
                appendReference={appendReferences}
              /> */
}

// const appendSkills = (skill: string) => {
//   careerFormSetValues("skills", [...careerFormGetValues().skills, skill]);
// };

// const appendReferences = (data: ReferenceType) => {
//   careerFormSetValues("references", [
//     ...careerFormGetValues().references,
//     data,
//   ]);
// };

// const filteredSkillsReferences = React.useMemo(
//   () =>
//     careerFormGetValues().references.filter(
//       (item) => item.field === "skills",
//     ),
//   [careerFormGetValues().references],
// );

// const submitCareerForm = careerFormHandleSubmit(async (data) => {
//   console.log("[INFO] Career Form State: ");
//   console.log(data);
// });
