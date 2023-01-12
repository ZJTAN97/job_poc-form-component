import { Button, Checkbox, Popover, Text } from "@mantine/core";
import {
  Row,
  useStyles,
  MainContainer,
  TitleContainer,
  Title,
  SelectAll,
} from "./styles";
import { useForm, Path } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { StringArrayInput } from "./components/StringArrayInput";
import { ObjectArrayInput } from "./components/ObjectArrayInput";
import { CertificationType } from "../../../../model/career/Certification";

import { IconEditCircle } from "@tabler/icons";
import { ReferencesTrigger } from "./components/References/ReferencesTrigger";
import { ReferencesPanel } from "./components/References/ReferencesPanel";
import React from "react";
import { AppointmentType } from "../../../../model/career/Appointment";
import {
  ReferenceStateProvider,
  useReferenceState,
} from "./components/References/References";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
  selectedCareerValue?: CareerType;
}

export const CareerHistoryForm = ({
  setDrawer,
  selectedCareerValue,
}: CareerHistoryFormProps) => {
  const { classes } = useStyles();

  const { saveOrCreateCareer } = useSaveOrCreateCareer();

  const referenceState = useReferenceState();
  const {
    dispatch,
    openPanel,
    currentArrayId,
    currentField,
    isMassApply,
    massAppliedFields,
    setMassAppliedFields,
  } = referenceState;

  // to transform skills content
  const transformedSelectedCareerValue: CareerType | undefined =
    React.useMemo(() => {
      if (selectedCareerValue) {
        const transformedSkillsReference = selectedCareerValue.references
          .filter((ref) => ref.field === "skills")
          .map((skillRef, id) => ({ ...skillRef, content: String(id) }));

        return {
          ...selectedCareerValue,
          references: [
            ...selectedCareerValue.references.filter(
              (ref) => ref.field !== "skills",
            ),
            ...transformedSkillsReference,
          ],
        };
      }
      return undefined;
    }, [selectedCareerValue]);

  const careerFormMethods = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: transformedSelectedCareerValue ?? {
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

  // TODO: move error state into the references components instead
  const {
    references_company,
    references_position,
    references_skills,
    references_certs,
  } = careerFormMethods.formState.errors as unknown as {
    [key: string]: { message: string };
  };

  const submitFormHandler = careerFormMethods.handleSubmit(async (data) => {
    const singleFieldReferences = careerFormMethods.getValues().references;
    const singleObjectReferences =
      careerFormMethods.getValues().appointment.references;
    const multiArrayReferences = careerFormMethods.getValues().certsToField;

    for (const [key, value] of Object.entries(careerFormMethods.getValues())) {
      // Single String Type
      if (typeof value === "string") {
        singleFieldReferences.map(
          (ref, id, arr) =>
            (arr[id] =
              ref.field === key ? { ...ref, content: value } : { ...ref }),
        );
      }
      // String Array Type
      else if (value instanceof Array && key === "skills") {
        singleFieldReferences.map((ref, id, arr) =>
          ref.field === "skills"
            ? (arr[id] = {
                ...ref,
                content: value[Number(ref.content)] as string,
              })
            : { ...ref },
        );
      }
      // Single Object Type
      else if (value instanceof Object && key === "appointment") {
        singleObjectReferences.map(
          (ref, id, arr) =>
            (arr[id] =
              ref.field === "position"
                ? { ...ref, content: data.appointment.position }
                : { ...ref, content: data.appointment.rank }),
        );
      }
      // Array Object Type
      else if (value instanceof Array && key == "certsToField") {
        multiArrayReferences.map(
          (certObj, id, arr) =>
            (arr[id] = {
              ...certObj,
              references: certObj.references.map((ref) => ({
                ...ref,
                content: ref.field === "name" ? certObj.name : certObj.issuedBy,
              })),
            }),
        );
      }
    }

    const requestBody: CareerType = {
      ...data,
      appointment: {
        ...data.appointment,
        references: singleObjectReferences,
      },
      references: singleFieldReferences,
      certsToField: multiArrayReferences,
    };
    saveOrCreateCareer({
      career: requestBody,
      id: careerFormMethods.getValues().id,
    });
    console.info("[SUCCESS]", requestBody);
    setDrawer(false);
  });

  const handleMassApply = () => {
    setMassAppliedFields.setState([]);
    if (isMassApply) {
      dispatch({
        type: "RESET_ALL",
      });
    } else {
      dispatch({
        type: "MASS_ADD",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      for (const [key, value] of Object.entries(
        careerFormMethods.getValues(),
      )) {
        if (
          (key === "company" || key === "duration") &&
          value.toString().length > 0
        ) {
          setMassAppliedFields.append({
            field: key,
          });
        } else if (key === "appointment") {
          Object.values(value).forEach((item, id) => {
            if (item.length > 0 && Object.keys(value)[id] !== "references") {
              setMassAppliedFields.append({
                field: Object.keys(value)[id] as Path<AppointmentType>,
              });
            }
          });
        } else if (key === "skills") {
          (value as string[]).forEach((item, id) => {
            if (item.length > 0) {
              setMassAppliedFields.append({
                field: key,
                arrayId: id,
              });
            }
          });
        } else if (key === "certsToField") {
          (value as CertificationType[]).forEach((cert, certId) => {
            Object.values(cert).forEach((value, id) => {
              if (value.length > 0 && Object.keys(cert)[id] !== "references") {
                setMassAppliedFields.append({
                  field: Object.keys(cert)[id] as Path<CertificationType>,
                  arrayId: certId,
                });
              }
            });
          });
        }
      }
    } else {
      setMassAppliedFields.setState([]);
    }
  };

  // console.info(careerFormMethods.getValues());
  // console.info(careerFormMethods.formState.errors);

  return (
    <ReferenceStateProvider value={referenceState}>
      <Form<CareerType>
        methods={careerFormMethods}
        preventLeaving={true}
        useLocalStorage={true}
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
              onClick={handleMassApply}
              leftIcon={<IconEditCircle />}
            >
              {isMassApply ? "Exit mass apply" : "Mass apply"}
            </Button>
          </TitleContainer>

          <Popover.Target>
            <MainContainer>
              {isMassApply ? (
                <SelectAll>
                  <Text size={"xs"}>Select all</Text>
                  <Checkbox
                    mr={12}
                    onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                  />
                </SelectAll>
              ) : null}
              {/* COMPANY */}
              <Row
                highlight={
                  (openPanel && currentField === "company") ||
                  massAppliedFields?.filter((item) => item.field === "company")
                    .length === 1
                }
              >
                <Form.TextInput<CareerType>
                  label={"Company name"}
                  name={"company"}
                  disabled={openPanel}
                  variant={!openPanel ? "default" : "unstyled"}
                  className={classes.formTextInput}
                  required
                />
                <ReferencesTrigger
                  field="company"
                  disabled={careerFormMethods.getValues().company.length > 0}
                />
              </Row>

              {/* DURATION */}
              <Row
                highlight={
                  (openPanel && currentField === "duration") ||
                  massAppliedFields?.filter((item) => item.field === "duration")
                    .length === 1
                }
              >
                <Form.TextInput<CareerType>
                  label={"Duration"}
                  name={"duration"}
                  disabled={openPanel}
                  variant={!openPanel ? "default" : "unstyled"}
                  className={classes.formTextInput}
                />
                <ReferencesTrigger
                  field="duration"
                  disabled={careerFormMethods.getValues().duration.length > 0}
                />
              </Row>

              {/* LAST DRAWN SALARY*/}
              <Row>
                <Form.TextInput<CareerType>
                  label={"Last Drawn Salary"}
                  name={"lastDrawnSalary"}
                  disabled={openPanel}
                  variant={!openPanel ? "default" : "unstyled"}
                  className={classes.formTextInput}
                />
              </Row>

              {/* APPOINTMENT (POSITION, RANK) */}
              <Row
                highlight={
                  (openPanel && currentField === "position") ||
                  massAppliedFields?.filter((item) => item.field === "position")
                    .length === 1
                }
              >
                <Form.TextInput<CareerType>
                  label={"Position"}
                  name={"appointment.position"}
                  disabled={openPanel}
                  variant={!openPanel ? "default" : "unstyled"}
                  className={classes.formTextInput}
                  required
                />
                <ReferencesTrigger
                  field="position"
                  disabled={
                    careerFormMethods.getValues().appointment.position.length >
                    0
                  }
                />
              </Row>

              <Row
                highlight={
                  (openPanel && currentField === "rank") ||
                  massAppliedFields?.filter((item) => item.field === "rank")
                    .length === 1
                }
              >
                <Form.TextInput<CareerType>
                  label={"Rank"}
                  name={"appointment.rank"}
                  disabled={openPanel}
                  variant={!openPanel ? "default" : "unstyled"}
                  className={classes.formTextInput}
                  required={true}
                />
                <ReferencesTrigger
                  field="rank"
                  disabled={
                    careerFormMethods.getValues().appointment.rank.length > 0
                  }
                />
              </Row>

              {/* SKILLS  */}
              <StringArrayInput<CareerType> name="skills" />

              {/* CERTS  */}
              <ObjectArrayInput<CareerType, CertificationType>
                name="certsToField"
                emptyObject={{
                  name: "",
                  issuedBy: "",
                  references: [],
                }}
              />

              <Button
                ml={15}
                mt={20}
                onClick={submitFormHandler}
                disabled={openPanel}
                variant={"light"}
              >
                Add Career
              </Button>
            </MainContainer>
          </Popover.Target>
        </Popover>
      </Form>
    </ReferenceStateProvider>
  );
};
