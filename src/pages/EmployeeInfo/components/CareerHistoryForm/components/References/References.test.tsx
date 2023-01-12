import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useReferenceState } from "./References";

describe("References", () => {
  it("type EDIT_ONE", () => {
    const { result } = renderHook(() => useReferenceState());
    act(() => {
      result.current.dispatch({
        type: "EDIT_ONE",
        currentField: "company",
        currentArrayId: 0,
      });
    });

    expect(result.current.openPanel).toBe(true);
    expect(result.current.isMassApply).toBe(false);
    expect(result.current.currentField).toBe("company");
    expect(result.current.currentArrayId).toBe(0);
  });

  it("type MASS_ADD", () => {
    const { result } = renderHook(() => useReferenceState());
    act(() => {
      result.current.dispatch({
        type: "MASS_ADD",
      });
    });
    expect(result.current.openPanel).toBe(true);
    expect(result.current.isMassApply).toBe(true);
    expect(result.current.currentField).toBeUndefined();
    expect(result.current.currentArrayId).toBeUndefined();
  });

  it("type RESET_ALL", () => {
    const { result } = renderHook(() => useReferenceState());

    act(() => {
      result.current.dispatch({
        type: "RESET_ALL",
      });
    });

    expect(result.current.openPanel).toBe(false);
    expect(result.current.isMassApply).toBe(false);
    expect(result.current.currentField).toBeUndefined();
    expect(result.current.currentArrayId).toBeUndefined();
  });
});
