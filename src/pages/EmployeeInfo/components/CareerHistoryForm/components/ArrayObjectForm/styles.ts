import styled from "@emotion/styled";

export const CertRow = styled("div")(({}) => ({
  display: "flex",
  gap: "20px",
  marginBottom: "10px",
}));

export const CertLabel = styled("div")(({ theme }) => ({
  display: "flex",
  fontSize: theme.fontSizes.sm,
  width: "250px",
}));

export const CertContainer = styled("div")(({}) => ({
  marginBottom: "30px",
  padding: "10px",
  width: "fit-content",
}));
