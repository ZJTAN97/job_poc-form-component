import { Button, Popover } from "@mantine/core";
import { Row, useStyles, MainContainer, TitleContainer, Title } from "./styles";
import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/career/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../components/Form";
import { useSaveOrCreateCareer } from "../../../../react-query/career";
import { StringArrayInput } from "./components/StringArrayInput";
import { ObjectArrayInput } from "./components/ObjectArrayInput";
import { CertificationType } from "../../../../model/career/Certification";

import { IconEditCircle } from "@tabler/icons";
import {
  ReferenceStateContext,
  useReferencesStateMethods,
} from "./components/References";
import { ReferencesTrigger } from "./components/References/ReferencesTrigger";
import { ReferencesPanel } from "./components/References/ReferencesPanel";
import React from "react";

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
  const referenceStateMethods = useReferencesStateMethods();
  const {
    openPanel,
    setOpenPanel,
    currentField,
    currentArrayId,
    massApplyingFields,
    setMassApplyingFields,
  } = referenceStateMethods;

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

  // TODO: CODE REVIEW WITH WC BEFORE THIS BECOMES BLACK-BOX CODE
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
    if (massApplyingFields === undefined) {
      setMassApplyingFields([]);
      if (currentField === undefined) {
        setOpenPanel(true);
      }
    } else {
      setMassApplyingFields(undefined);
      if (currentField === undefined) {
        setOpenPanel(false);
      }
    }
  };

  // console.info(careerFormMethods.getValues());
  // console.log(careerFormMethods.formState.errors);

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
            <Row highlight={openPanel && currentField === "company"}>
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
                disabled={careerFormMethods.formState.dirtyFields.company}
              />
            </Row>

            {/* DURATION */}
            <Row highlight={openPanel && currentField === "duration"}>
              <Form.TextInput<CareerType>
                label={"Duration"}
                name={"duration"}
                disabled={openPanel}
                variant={!openPanel ? "default" : "unstyled"}
                className={classes.formTextInput}
              />
              <ReferencesTrigger
                field="duration"
                disabled={careerFormMethods.formState.dirtyFields.duration}
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
            <Row highlight={openPanel && currentField === "position"}>
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
                  careerFormMethods.formState.dirtyFields.appointment?.position
                }
              />
            </Row>

            <Row highlight={openPanel && currentField === "rank"}>
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
                  careerFormMethods.formState.dirtyFields.appointment?.rank
                }
              />
            </Row>

            {/* SKILLS  */}
            <StringArrayInput<CareerType>
              name="skills"
              referenceTrigger={(arrId) => (
                <ReferencesTrigger
                  field="skills"
                  disabled={
                    careerFormMethods.getValues().skills[arrId].length > 1
                  }
                  arrId={arrId}
                />
              )}
            />

            {/* CERTS  */}
            <ObjectArrayInput<CareerType, CertificationType>
              name="certsToField"
              emptyObject={{
                name: "",
                issuedBy: "",
                references: [],
              }}
              referenceTrigger={(arrId, field) => (
                <ReferencesTrigger
                  field={field}
                  disabled={
                    field === "issuedBy"
                      ? careerFormMethods.getValues().certsToField[arrId]
                          .issuedBy.length > 1
                      : careerFormMethods.getValues().certsToField[arrId].name
                          .length > 1
                  }
                  arrId={arrId}
                />
              )}
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
  );
};
