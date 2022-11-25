import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  formTextInput: {
    width: "400px",
  },
}));

export const MainContainer = styled("div")(({}) => ({
  padding: "0 50px",
}));

export const SkillLabel = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: theme.fontSizes.sm,
  paddingTop: "8px",
}));

export const InputRow = styled("div")(({}) => ({
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  margin: `${theme.spacing.sm} 0`,
}));

export const Row = styled("div")(({}) => ({
  display: "flex",
  margin: "30px 0",
  gap: "20px",
  padding: "10px",
}));

export const ColTitle = styled("div")(({}) => ({
  width: "200px",
}));

export const Col = styled("div")(({}) => ({
  width: "80%",
}));
