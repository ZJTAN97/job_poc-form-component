import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  returnBtn: {
    position: "absolute",
    bottom: "50px",
    left: "0",
  },
  applyBtn: {
    backgroundColor: "white",
  },
  addIconBtn: {
    marginTop: "3px",
  },
}));

export const TitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

export const Title = styled("div")(({ theme }) => ({
  fontSize: theme.fontSizes.lg,
  fontWeight: 600,
}));

export const ButtonRow = styled("div")(({ theme }) => ({
  backgroundColor: "#fafafa",
  padding: "10px",
  marginTop: "40px",
  display: "flex",
  justifyContent: "space-between",
}));

export const ReferenceCard = styled("div")(({ theme }) => ({
  padding: "10px",
  border: "solid 1px #dfdfdf",
  borderRadius: "5px",
  marginTop: "10px",
}));

export const ReferenceCardRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
