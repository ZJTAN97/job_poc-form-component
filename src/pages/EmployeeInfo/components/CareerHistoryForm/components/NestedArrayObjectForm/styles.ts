import styled from "@emotion/styled";

export const Row = styled("div")(({}) => ({
  display: "flex",
  margin: `40px 0`,
  gap: "25px",
}));

export const CertRow = styled("div")(({}) => ({
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
}));

export const ColTitle = styled("div")(({}) => ({
  padding: "10px",
  width: "20%",
}));

export const Col = styled("div")(({}) => ({
  padding: "10px",
  width: "45%",
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  margin: `${theme.spacing.sm} 0`,
}));

export const InputRowRef = styled("div")(({}) => ({
  marginTop: "28px",
}));
