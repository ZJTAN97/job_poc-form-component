import styled from "@emotion/styled";
import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  formTextInput: {
    margin: "20px 0",
  },
}));

const _AddReferenceTrigger = styled(Box)(() => ({
  paddingTop: "2px",
  fontSize: "13px",
  cursor: "pointer",
  ":hover": {
    color: "red",
  },
}));

export const AddReferenceTrigger = createPolymorphicComponent<
  "button",
  BoxProps
>(_AddReferenceTrigger);

const _ReferenceHeader = styled(Box)(() => ({
  margin: "10px 0 20px 0",
  fontSize: "16px",
}));

export const ReferenceHeader = createPolymorphicComponent<"div", BoxProps>(
  _ReferenceHeader,
);
