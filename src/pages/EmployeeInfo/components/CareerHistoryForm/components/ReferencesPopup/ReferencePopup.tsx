import { Button, Popover } from "@mantine/core";
import React from "react";
import {
  Source,
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../model/common/Source";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import {
  IconArrowLeft,
  IconCirclePlus,
  IconEdit,
  IconIdOff,
} from "@tabler/icons";
import { CareerType } from "../../../../../../model/career/Career";
import { useFieldArray, useFormContext, useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";
import { Form } from "../../../../../../components/Form";
import { CertificationType } from "../../../../../../model/career/Certification";
import { AppointmentType } from "../../../../../../model/career/Appointment";

interface ReferencePopupProps {
  setIsOpenPopover: (arg: boolean) => void;

  /** set main career form to be able to edit */
  setEditMode: (arg: boolean) => void;

  /** Field name required to populate reference object */
  currentName:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;

  /** Content required to populate reference object */
  currentContent: string;

  /** Last applied source */
  lastSource?: SourceType;

  /** Set last applied source */
  setLastSource: (arg: SourceType) => void;

  /** for handling array of objects */
  currentArrayObjId: number;
}

export const ReferencePopup = ({
  setIsOpenPopover,
  setEditMode,
  currentName,
  currentContent,
  lastSource,
  setLastSource,
  currentArrayObjId,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const careerFormMethod = useFormContext<CareerType>();

  // const { company, appointment, certsToField, duration, skills } =
  //   careerFormMethod.getValues();

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  const existingReference: ReferenceType = React.useMemo(() => {
    const allReferences = [
      ...careerFormMethod.getValues().references,
      ...careerFormMethod.getValues().appointment.references,
      ...careerFormMethod
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ];
    return allReferences.filter(
      (ref) => ref.field === currentName && ref.content === currentContent,
    )[0];
  }, [careerFormMethod.getValues()]);

  // const content =
  //   currentName === "company"
  //     ? company
  //     : currentName === "duration"
  //     ? duration
  //     : currentName === "position"
  //     ? appointment.position
  //     : currentName === "rank"
  //     ? appointment.rank
  //     : currentName === "name" && currentArrayObjId
  //     ? certsToField[currentArrayObjId].name
  //     : currentName === "issuedBy" && currentArrayObjId
  //     ? certsToField[currentArrayObjId].issuedBy
  //     : currentName === "skills"
  //     ? skills[currentArrayObjId]
  //     : "";

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: currentName,
      content: currentContent,
      sources: existingReference ? existingReference.sources : [],
    },
  });

  const [popupMode, setPopupMode] = React.useState<"edit" | "read">(
    existingReference ? "read" : "edit",
  );

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "2022-11-11T12:19:54.52",
      referenceType: undefined,
    },
  });

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: careerFormMethod.control,
    name:
      currentName === "rank" || currentName === "position"
        ? "appointment.references"
        : currentName === "issuedBy" || currentName === "name"
        ? "certsToField"
        : "references",
  });

  const sourceArrayMethods = useFieldArray<ReferenceType>({
    control: referenceFormMethod.control,
    name: "sources",
  });

  const submitReferences = () => {
    sourceArrayMethods.append(sourceFormMethod.getValues());

    const isAppointmentReference =
      currentName === "rank" || currentName === "position";

    const isCertReference =
      currentName === "issuedBy" || currentName === "name";

    if (isAppointmentReference) {
      // Handling Object Type (Appointment)
      if (existingReference) {
        // update
        const id = careerFormMethod
          .getValues()
          .appointment.references.indexOf(existingReference);
        referenceArrayMethods.update(id, referenceFormMethod.getValues());
      } else {
        // append
        referenceArrayMethods.append(referenceFormMethod.getValues());
      }
    } else if (isCertReference) {
      // Handling Object Type (Certifications)
      const objSelected =
        careerFormMethod.getValues().certsToField[currentArrayObjId];
      if (existingReference) {
        // update
        const certObjReferenceId =
          objSelected.references.indexOf(existingReference);

        let existingReferencesForCert = objSelected.references;

        existingReferencesForCert[certObjReferenceId] =
          referenceFormMethod.getValues();

        referenceArrayMethods.update(currentArrayObjId, {
          ...objSelected,
          references: existingReferencesForCert,
        });
      } else {
        // append
        referenceArrayMethods.update(currentArrayObjId, {
          ...objSelected,
          references: [
            ...objSelected.references,
            referenceFormMethod.getValues(),
          ],
        });
      }
    } else {
      // Handling String & String Array Type
      if (existingReference) {
        // update
        const id = careerFormMethod
          .getValues()
          .references.indexOf(existingReference);
        referenceArrayMethods.update(id, referenceFormMethod.getValues());
      } else {
        // append
        referenceArrayMethods.append(referenceFormMethod.getValues());
      }
    }

    setLastSource(sourceFormMethod.getValues());
    sourceFormMethod.reset();
    setPopupMode("read");
  };

  const editSource = (id: number) => {
    console.log("-- to be implemented --");
  };

  const deleteSource = (id: number) => {
    sourceArrayMethods.remove(id);
    const referenceId = careerFormMethod
      .getValues()
      .references.indexOf(existingReference);
    referenceArrayMethods.update(referenceId, referenceFormMethod.getValues());

    if (referenceFormMethod.getValues().sources.length === 0) {
      setPopupMode("edit");
    }
  };

  const handleClosePanel = () => {
    setEditMode(true);
    setIsOpenPopover(false);
  };

  const applyLast = () => {
    if (lastSource) {
      sourceFormMethod.setValue("referenceType", lastSource.referenceType);
      sourceFormMethod.setValue("dateObtained", lastSource.dateObtained);
      if (lastSource.comment.length > 0) {
        setShowCommentsInput(true);
        sourceFormMethod.setValue("comment", lastSource.comment);
      }
      console.log("[INFO ] Applied last filled references");
    }
  };

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        {existingReference?.sources && existingReference.sources.length > 0 && (
          <IconCirclePlus
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setPopupMode("edit")}
            className={classes.addIconBtn}
          />
        )}
      </TitleContainer>

      {popupMode === "edit" ? (
        <Form methods={sourceFormMethod}>
          {lastSource && (
            <Button
              size="xs"
              variant="subtle"
              p={0}
              mt={10}
              onClick={applyLast}
            >
              Apply last source
            </Button>
          )}
          <Form.Dropdown
            control={sourceFormMethod.control}
            name={"referenceType"}
            mt={20}
            mb={20}
            label={"Select source"}
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            control={sourceFormMethod.control}
            name={"dateObtained"}
            mb={20}
            label={"Date Obtained"}
          />
          {showCommentsInput ? (
            <Form.TextInput
              control={sourceFormMethod.control}
              name={"comment"}
              mb={20}
              label={"Comments"}
            />
          ) : (
            <Button
              leftIcon={<IconCirclePlus />}
              size={"xs"}
              variant={"subtle"}
              onClick={() => setShowCommentsInput(true)}
            >
              Comment
            </Button>
          )}
        </Form>
      ) : (
        <div>
          {existingReference.sources.map((item, id) => (
            <ReferenceCard key={"refCard" + id}>
              <div>{item.referenceType}</div>
              <ReferenceCardRow>
                <div>{item.dateObtained}</div>
                <div>
                  <IconEdit
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => editSource(id)}
                  />
                  <IconIdOff
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteSource(id)}
                  />
                </div>
              </ReferenceCardRow>
              <div>{item.comment}</div>
            </ReferenceCard>
          ))}
        </div>
      )}

      <ButtonRow>
        {popupMode === "edit" && (
          <Button
            size={"xs"}
            variant="subtle"
            onClick={() => setPopupMode("read")}
            disabled={referenceFormMethod.getValues().sources.length === 0}
          >
            Cancel
          </Button>
        )}
        <Button
          classNames={{
            root: classes.applyBtn,
          }}
          size={"xs"}
          variant="outline"
          onClick={submitReferences}
          disabled={popupMode === "read"}
        >
          Apply
        </Button>
      </ButtonRow>

      <Button
        classNames={{
          root: classes.returnBtn,
        }}
        mt={50}
        onClick={handleClosePanel}
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
      >
        Confirm and close panel
      </Button>
    </Popover.Dropdown>
  );
};
