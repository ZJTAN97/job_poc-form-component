import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import styled from "@emotion/styled";

export const useStyles = createStyles(() => ({
  groupLabel: {
    margin: "40px 0",
  },
  header: {
    color: "#3f3f3f",
    fontSize: "20px",
    padding: "5px",
  },
  textInput: {
    margin: "0 0 30px 0",
  },
  skillItem: {
    paddingTop: "2px",
    color: "#3f3f3f",
    fontSize: "16px",
    marginBottom: "15px",
  },
}));

const _Label = styled(Box)(() => ({
  margin: "30px 0 10px 0",
  fontSize: "16px",
  color: "#3f3f3f",
}));

export const Label = createPolymorphicComponent<"div", BoxProps>(_Label);

const _CurrentValue = styled(Box)(() => ({
  fontSize: "14px",
}));

export const CurrentValue = createPolymorphicComponent<"div", BoxProps>(
  _CurrentValue,
);

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
