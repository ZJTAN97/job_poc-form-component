import React from "react";
import useReferencesTool from "../hook";
import { FieldValues, useFormContext } from "react-hook-form";

export const Panel = <T extends FieldValues>() => {
  const { openPanel } = useReferencesTool();

  const careerFormMethod = useFormContext<T>();

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);
  const [sourceId, setSourceId] = React.useState<number>();

  // how do you make it generic such that it can handle all 3 different types?
  // go home solve

  return <div>{openPanel ? "Open panel" : "close panel"}</div>;
};
