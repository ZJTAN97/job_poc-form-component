import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Popover, TextInput } from "@mantine/core";
import {
  SchemaCareer,
  SchemaCareerType,
  SchemaReference,
  SchemaReferenceType,
} from "../../../validations/career";
import Form from "../../../components/Form";

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

  const referenceFormMethods = useForm<SchemaReferenceType>({
    resolver: zodResolver(SchemaReference),
    mode: "onChange",
    defaultValues: {
      appliedTo: "",
      comments: "",
      dateObtained: "",
      referenceType: "LinkedIn",
    },
  });

  const {
    control: referenceFormControl,
    getValues: referenceFormGetValues,
    setValue: referenceFormSetValues,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  const [currentSkillInput, setCurrentSkillInput] = React.useState("");
  const [currentCertInput, setCurrentCertInput] = React.useState("");

  const [openReferenceWindow, setOpenReferenceWindow] = React.useState(false);
  const [showSkillInput, setShowSkillInput] = React.useState(false);
  const [showCertsInput, setShowCertsInput] = React.useState(false);

  const appendSkills = () => {
    if (showSkillInput && currentSkillInput.length > 0) {
      careerFormSetValues("skills", [
        ...careerFormGetValues().skills,
        currentSkillInput,
      ]);
      setShowSkillInput(false);
    } else {
      setShowSkillInput(true);
    }
  };

  const appendCerts = () => {
    if (showCertsInput && currentCertInput.length > 0) {
      // careerFormSetValues("certs", [
      //   ...careerFormGetValues().certs,
      //   currentCertInput,
      // ]);
      setShowCertsInput(false);
    } else {
      setShowCertsInput(true);
    }
  };

  const submitReferenceForm = referenceFormHandleSubmit(async (data) => {
    console.log("[INFO] Reference Form State: ");
    console.log(data);
    careerFormSetValues("references", [
      ...careerFormGetValues().references,
      data,
    ]);
    setOpenReferenceWindow(false);
  });

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
                  <div className={styles.text__input}>
                    <Form.TextInput
                      label={"Company"}
                      name={"company"}
                      control={careerFormControl}
                    />
                    <div className={styles.applied__reference}>
                      {
                        careerFormGetValues().references.find(
                          (item) => item.appliedTo === "company",
                        )?.referenceType
                      }
                    </div>
                  </div>
                  <div className={styles.text__input}>
                    <Form.TextInput
                      label={"Position"}
                      name={"appointment.position"}
                      control={careerFormControl}
                    />
                    <div className={styles.applied__reference}>{}</div>
                  </div>
                  <div className={styles.text__input}>
                    <Form.TextInput
                      label={"Rank"}
                      name={"appointment.rank"}
                      control={careerFormControl}
                    />
                    <div className={styles.applied__reference}>{}</div>
                  </div>
                </div>
                <div className={styles.container__col}>
                  <div className={styles.text__input}>
                    <Form.TextInput
                      label={"Duration"}
                      name={"duration"}
                      control={careerFormControl}
                    />
                    <div className={styles.applied__reference}>{}</div>
                  </div>
                  <div className={styles.text__input}>
                    <Form.TextInput
                      label={"Last Drawn Salary"}
                      name={"lastDrawnSalary"}
                      control={careerFormControl}
                    />
                    <div className={styles.applied__reference}>{}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main__container}>
              <div className={styles.container__flex}>
                <div className={styles.container__col}>
                  <div className={styles.skills__header}>Skill Sets</div>
                  <div>
                    {careerFormGetValues().skills.map((item, id) => (
                      <div
                        className={styles.skills__item}
                        key={item.toString() + id}
                      >
                        {item}
                      </div>
                    ))}
                    {showSkillInput && (
                      <TextInput
                        className={styles.skills__input}
                        onChange={(e) => setCurrentSkillInput(e.target.value)}
                      />
                    )}
                    <div className={styles.append__array_btn}>
                      <div
                        className={styles.circular__add}
                        onClick={appendSkills}
                      >
                        +
                      </div>{" "}
                      Add Skills
                    </div>
                  </div>
                </div>
                <div className={styles.container__col}>
                  <div className={styles.skills__header}>Certificates</div>
                  <div>
                    {careerFormGetValues().certs.map((item, id) => (
                      <div
                        className={styles.skills__item}
                        key={item.toString() + id}
                      >
                        {item.name} | {item.issuedBy}
                      </div>
                    ))}
                    {showCertsInput && (
                      <TextInput
                        className={styles.skills__input}
                        onChange={(e) => setCurrentCertInput(e.target.value)}
                      />
                    )}
                    <div className={styles.append__array_btn}>
                      <div
                        className={styles.circular__add}
                        onClick={appendCerts}
                      >
                        +
                      </div>{" "}
                      Add Certs
                    </div>
                  </div>
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
          <Form.Dropdown
            label={"Applied Field"}
            control={referenceFormControl}
            name={"appliedTo"}
            className={styles.dropdowns}
            data={["company", "position", "duration", "lastDrawnSalary"]}
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
            onClick={submitReferenceForm}
          >
            Apply
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
