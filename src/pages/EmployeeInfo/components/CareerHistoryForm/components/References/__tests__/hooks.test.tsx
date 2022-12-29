import { renderHook } from "@testing-library/react";
import { Path } from "react-hook-form";
import { CareerType } from "../../../../../../../model/career/Career";
import { TYPES_OF_REFERENCES } from "../../../../../../../model/common/Source";
import { useExistingReference, useLocateReference2 } from "../hooks";

const sampleFormValue: CareerType = {
  company: "company",
  duration: "duration",
  lastDrawnSalary: "lastDrawnSalary",
  skills: ["skills"],
  references: [
    {
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
    },
    {
      field: "lastDrawnSalary",
      content: "",
      sources: [
        {
          referenceType: TYPES_OF_REFERENCES.FACEBOOK,
          comment: "lastDrawnSalary",
          dateObtained: "11/11/2011",
        },
      ],
    },
  ],
  appointment: {
    position: "position",
    rank: "rank",
    references: [
      {
        field: "position",
        content: "",
        sources: [],
      },
    ],
  },
  certsToField: [
    {
      name: "name",
      issuedBy: "issuedBy",
      references: [
        {
          field: "name",
          content: "",
          sources: [],
        },
      ],
    },
  ],
};

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

describe("hooks/useLocateReference", () => {
  it("Locate correct reference based on fieldName", () => {
    const { result } = renderHook(() =>
      useLocateReference2<CareerType>("company"),
    );

    result.current;
  });
});
