import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  formTextInput: {
    margin: "25px 0",
  },
}));

export const AddRef = styled("span")(({ theme }) => ({
  fontSize: theme.fontSizes.xs,
}));

export const AddReferenceTrigger = styled("div")(({ theme }) => ({
  fontSize: theme.fontSizes.xs,
  color: "#8b98e5",
  cursor: "pointer",
  ":hover": {
    color: "red",
  },
  border: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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
