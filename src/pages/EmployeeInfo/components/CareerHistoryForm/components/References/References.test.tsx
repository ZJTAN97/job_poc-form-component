import { render, renderHook } from "@testing-library/react";
import React from "react";
import {
  ReferenceStateContext2,
  useReferenceStateContext2,
  useReferenceStateMethods2,
} from "./References2";

const referenceStateMethods = (() => {
  const { result } = renderHook(() => useReferenceStateMethods2());
  return result.current;
})();

const WrappedReferenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReferenceStateContext2.Provider value={referenceStateMethods}>
      {children}
    </ReferenceStateContext2.Provider>
  );
};

describe("component/References", () => {
  describe("References Context and Provider", () => {
    it("test dispatch edit one", () => {
      render(<WrappedReferenceProvider>{""}</WrappedReferenceProvider>);
    });
  });
});
