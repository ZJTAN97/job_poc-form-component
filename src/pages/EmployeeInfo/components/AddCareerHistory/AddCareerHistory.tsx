import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MultiSelect, Popover } from "@mantine/core";
import {
  SchemaCareer,
  SchemaCareerType,
  SchemaReference,
  SchemaReferenceType,
} from "../../../../validations/career";
import Form from "../../../../components/Form";
import { MultiField } from "../MultiField";
import { SingleField } from "../SingleField";

export const AddCareerHistory = () => {
  const careerFormMethods = useForm<SchemaCareerType>({
    resolver: zodResolver(SchemaCareer),
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
    handleSubmit: careerFormHandleSubmit,
  } = careerFormMethods;

  const appendSkills = (skill: string) => {
    careerFormSetValues("skills", [...careerFormGetValues().skills, skill]);
  };

  const referenceFormMethods = useForm<SchemaReferenceType>({
    resolver: zodResolver(SchemaReference),
    mode: "onChange",
    defaultValues: {
      field: "",
      content: "",
      comments: "",
      dateObtained: "",
      referenceType: "LinkedIn",
    },
  });

  const {
    control: referenceFormControl,
    // getValues: referenceFormGetValues,
    // setValue: referenceFormSetValues,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  const [singleFieldsSelected, setSingleFieldsSelected] = React.useState<
    string[]
  >([]);

  const [openReferenceWindow, setOpenReferenceWindow] = React.useState(false);

  const appendReferences = (data: SchemaReferenceType) => {
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

  const singleFieldsAppendReference = referenceFormHandleSubmit(
    async (data) => {
      singleFieldsSelected.forEach((item) => {
        careerFormSetValues("references", [
          ...careerFormGetValues().references,
          {
            ...data,
            content: "",
            field: item,
          },
        ]);
      });
      setOpenReferenceWindow(false);
    },
  );

  const submitCareerForm = careerFormHandleSubmit(async (data) => {
    console.log("[INFO] Career Form State: ");
    console.log(data);
  });

  console.log("[INFO] Career Form State: ");
  console.log(careerFormWatch());

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
            <div className={styles.main__container}>
              <h2>Career History</h2>
              <div className={styles.container__flex}>
                <div className={styles.container__col}>
                  <SingleField
                    parentControl={careerFormControl}
                    label={"Company"}
                    name={"company"}
                    reference={
                      careerFormGetValues().references.filter(
                        (item) => item.field === "company",
                      )[0]
                    }
                  />
                  <SingleField
                    parentControl={careerFormControl}
                    label={"Position"}
                    name={"appointment.position"}
                    reference={
                      careerFormGetValues().references.filter(
                        (item) => item.field === "appointment.position",
                      )[0]
                    }
                  />
                  <SingleField
                    parentControl={careerFormControl}
                    label={"Rank"}
                    name={"appointment.rank"}
                    reference={
                      careerFormGetValues().references.filter(
                        (item) => item.field === "appointment.rank",
                      )[0]
                    }
                  />
                </div>
                <div className={styles.container__col}>
                  <SingleField
                    parentControl={careerFormControl}
                    label={"Duration"}
                    name={"duration"}
                    reference={
                      careerFormGetValues().references.filter(
                        (item) => item.field === "duration",
                      )[0]
                    }
                  />
                  <SingleField
                    parentControl={careerFormControl}
                    label={"Last Drawn Salary"}
                    name={"lastDrawnSalary"}
                    reference={
                      careerFormGetValues().references.filter(
                        (item) => item.field === "lastDrawnSalary",
                      )[0]
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.main__container}>
              <div className={styles.container__flex}>
                <div className={styles.container__col}>
                  <MultiField
                    title={"Skill Set"}
                    data={careerFormGetValues().skills}
                    references={filteredSkillsReferences}
                    appliedField={"skills"}
                    appendHandler={appendSkills}
                    appendReference={appendReferences}
                  />
                </div>
                <div className={styles.container__col}>
                  Certificate stuffs here
                  {/* TODO: MultiObject component */}
                </div>
              </div>
            </div>
          </Form>
          <div className={styles.add__button}>
            <Button
              variant="white"
              size="xs"
              onClick={() => setOpenReferenceWindow(!openReferenceWindow)}
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
            data={[
              "company",
              "appointment.position",
              "appointment.rank",
              "duration",
              "lastDrawnSalary",
            ]}
            maxDropdownHeight={200}
            onChange={(arr) => setSingleFieldsSelected(arr)}
          />
          <Form.Dropdown
            label={"Reference Type"}
            control={referenceFormControl}
            name={"referenceType"}
            className={styles.dropdowns}
            data={["LinkedIn", "Glassdoor", "Others"]}
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
            onClick={singleFieldsAppendReference}
          >
            Apply
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
