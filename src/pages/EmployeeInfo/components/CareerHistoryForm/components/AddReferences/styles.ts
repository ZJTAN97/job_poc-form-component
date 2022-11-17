import styled from "@emotion/styled";

export const Label = styled("div")(() => ({
  margin: "30px 0 10px 0",
  fontSize: "16px",
  color: "#3f3f3f",
}));

export const CurrentValue = styled("div")(() => ({
  fontSize: "14px",
}));

export const AddReferenceTrigger = styled("div")(() => ({
  paddingTop: "2px",
  fontSize: "13px",
  cursor: "pointer",
  ":hover": {
    color: "red",
  },
}));
