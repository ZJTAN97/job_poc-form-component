import React from "react";
import { CareerType } from "../../../../../../../model/career/Career";
import { useReferenceStateContext } from "../References";
import { useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { useCurrentContent, useExistingReference } from "../utils";

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const formContext = useFormContext<CareerType>();
  const referenceStateContext = useReferenceStateContext();

  const { currentField } = referenceStateContext!;

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);
  const [sourceId, setSourceId] = React.useState<number>();

  const currentContent = useCurrentContent<CareerType>({
    formMethods: formContext,
    currentField: currentField as Path<CareerType>,
  });

  const existingReference = useExistingReference({
    references: [
      ...formContext.getValues().references,
      ...formContext.getValues().appointment.references,
      ...formContext
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ],
    field: currentField as Path<CareerType>,
    content: currentContent,
  });

  console.log("-- content --");
  console.log(currentContent);

  return <div>Panel</div>;
};
