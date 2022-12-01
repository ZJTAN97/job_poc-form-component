import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  skillTextInput: {
    width: "400px",
    marginBottom: "10px",
  },
  reference: {
    fontSize: "12px",
    cursor: "pointer",
    height: "36px",
    padding: "0",
    overflow: "hidden",
  },
}));

export const ArrayContainer = styled("div")(({}) => ({
  padding: "10px 0 10px 0",
}));

export const ArrayRow = styled("div")(({}) => ({
  display: "flex",
  gap: "10px",
}));

export const ObjectArrayRow = styled("div")(({}) => ({
  marginTop: "10px",
  marginBottom: "50px",
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  margin: `${theme.spacing.sm} 0`,
}));
