import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  icon: {
    marginTop: "3px",
    cursor: "pointer",
  },
}));

export const MainContainer = styled("div")(({}) => ({
  padding: "0px 40px 10px 40px",
}));

export const FieldBlock = styled("div")(({}) => ({
  marginBottom: "10px",
  marginTop: "35px",
}));

export const ContentBlock = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const ContentLabel = styled("label")(({ theme }) => ({
  fontSize: theme.fontSizes.sm,
  color: theme.colorScheme[0],
}));

export const ContentInfo = styled("div")(({ theme }) => ({
  fontSize: theme.fontSizes.xs,
  color: theme.colorScheme[9],
  marginTop: "5px",
  fontWeight: 500,
}));

export const ReferenceBlock = styled("div")(({ theme }) => ({
  fontSize: "11px",
  color: theme.colorScheme[0],
  marginTop: "5px",
}));

export const TitleBlock = styled("div")(({ theme }) => ({
  fontSize: theme.fontSizes.xl,
  display: "flex",
  gap: "15px",
}));
