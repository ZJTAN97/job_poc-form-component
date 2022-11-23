import styled from "@emotion/styled";

export const SkillLabel = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing.xs,
  paddingBottom: theme.spacing.xs,
  fontSize: theme.fontSizes.sm,
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  margin: `${theme.spacing.sm} 0`,
}));

export const Row = styled("div")(({}) => ({
  display: "flex",
  margin: `40px 0`,
  gap: "25px",
}));

export const ColTitle = styled("div")(({}) => ({
  padding: "10px",
  width: "20%",
}));

export const Col = styled("div")(({}) => ({
  padding: "10px",
  width: "45%",
}));
