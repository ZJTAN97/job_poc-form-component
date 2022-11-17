import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  formTextInput: {
    margin: "25px 0",
  },
}));

export const AddReferenceTrigger = styled("button")(({ theme }) => ({
  fontSize: theme.fontSizes.xs,
  cursor: "pointer",
  ":hover": {
    color: "red",
  },
  border: "none",
}));

export const ReferenceHeader = styled("div")(() => ({
  margin: "10px 0 20px 0",
  fontSize: "16px",
}));

export const ButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing.lg,
}));
