import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  formTextInput: {
    width: "400px",
  },
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
  dropdown: {
    height: "-webkit-fill-available",
    border: "none",
    borderLeft: "solid 1px #dfdfdf",
    minHeight: "95vh",
  },
}));

export const MainContainer = styled("div")(({}) => ({
  padding: "0 10px 0 40px",
  marginBottom: "50px",
  width: "fit-content",
}));

export const SkillLabel = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: theme.fontSizes.sm,
  paddingTop: "8px",
}));

export const Row = styled("div")(({}) => ({
  display: "flex",
  margin: "30px 0",
  gap: "10px",
  padding: "15px 0",
}));

export const AddRefButton = styled("button")(({ theme }) => ({
  marginTop: theme.spacing.xl,
  fontSize: theme.fontSizes.xs,
  marginLeft: "5px",
  height: "36px",
}));
