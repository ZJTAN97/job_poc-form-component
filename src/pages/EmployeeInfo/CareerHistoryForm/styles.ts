import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  formTextInput: {
    width: "400px",
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
    minHeight: "95vh",
    top: "0 !important",
  },
}));

export const MainContainer = styled("div")(({}) => ({
  padding: "0 50px 50px 40px",
  marginBottom: "50px",
  width: "fit-content",
  overflowY: "scroll",
  height: "84vh",
}));

export const SkillLabel = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: theme.fontSizes.sm,
  paddingTop: "8px",
}));

export const Row = styled("div")(({ highlight }: { highlight?: boolean }) => ({
  display: "flex",
  marginTop: "10px",
  marginBottom: "10px",
  gap: "10px",
  padding: "20px 15px",
  borderRadius: "5px",
  backgroundColor: highlight ? "rgb(192 235 249 / 20%)" : "",
}));

export const AddRefButton = styled("button")(({ theme }) => ({
  marginTop: theme.spacing.xl,
  fontSize: theme.fontSizes.xs,
  marginLeft: "5px",
  height: "36px",
}));

export const TitleContainer = styled("div")(({}) => ({
  position: "sticky",
  top: 0,
  zIndex: 2,
  background: "white",
  maxWidth: "640px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "solid 1px #dfdfdf",
  marginLeft: "50px",
}));

export const Title = styled("div")(({}) => ({
  fontSize: "18px",
  fontWeight: 600,
}));

export const SelectAll = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  width: "69%",
  alignItems: "end",
  marginTop: "10px",
}));
