import { renderHook } from "@testing-library/react";
import { TYPES_OF_REFERENCES } from "../../../../../../model/common/Source";
import {
  sampleFormValue,
  sampleReferenceValue,
  sampleSourceValue,
} from "./constants";
import { useExistingReference, useUpdateReferences } from "./hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Career, CareerType } from "../../../../../../model/career/Career";

describe("hooks/useExistingReference", () => {
  it("No references matches", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        formValue: sampleFormValue,
        field: "skills",
      }),
    );
    expect(result.current.stringText).toBe("");
    expect(result.current.filteredReference).toBeUndefined();
  });

  it("Reference match with single source", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        field: "lastDrawnSalary",
        formValue: sampleFormValue,
      }),
    );

    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011`);
  });

  it("Reference match with multiple sources", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        field: "company",
        formValue: sampleFormValue,
      }),
    );

    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011 + 1 more`);
    expect(result.current.filteredReference).toMatchObject({
      field: "company",
      content: "",
      sources: [
        {
          referenceType: TYPES_OF_REFERENCES.FACEBOOK,
          comment: "company",
          dateObtained: "11/11/2011",
        },
        {
          referenceType: TYPES_OF_REFERENCES.FACEBOOK,
          comment: "company",
          dateObtained: "11/11/2011",
        },
      ],
    });
  });
});

describe("hooks/useUpdateReference", () => {
  it("create/update reference for single object type", () => {
    const { result } = renderHook(() =>
      useForm<CareerType>({
        resolver: zodResolver(Career),
        mode: "onChange",
        defaultValues: {
          company: "",
          appointment: {
            position: "",
            rank: "",
            references: [],
          },
          skills: [],
          references: [],
          certsToField: [],
          lastDrawnSalary: "",
          duration: "",
        },
      }),
    );

    renderHook(() =>
      useUpdateReferences({
        formContext: result.current,
        field: "position",
        reference: sampleReferenceValue,
        source: sampleSourceValue,
      }),
    );

    expect(result.current.getValues().appointment.references.length).toBe(1);
    expect(
      result.current
        .getValues()
        .appointment.references.filter((item) => item.field === "position")[0]
        .sources.length,
    ).toBe(1);

    renderHook(() =>
      useUpdateReferences({
        formContext: result.current,
        field: "position",
        reference: sampleReferenceValue,
        source: sampleSourceValue,
      }),
    );

    expect(result.current.getValues().appointment.references.length).toBe(1);
    expect(
      result.current
        .getValues()
        .appointment.references.filter((item) => item.field === "position")[0]
        .sources.length,
    ).toBe(2);
  });
  it("create/update reference for string array type", () => {});
});
