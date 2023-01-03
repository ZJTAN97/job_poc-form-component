import { renderHook } from "@testing-library/react";
import { TYPES_OF_REFERENCES } from "../../../../../../model/common/Source";
import { useExistingReference, useUpdateReferences } from "./hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Career, CareerType } from "../../../../../../model/career/Career";

const mockSourceValue = (() => ({
  referenceType: TYPES_OF_REFERENCES.FACEBOOK,
  comment: "",
  dateObtained: "11/11/2011",
}))();

const mockEditedSourceValue = (() => ({
  referenceType: TYPES_OF_REFERENCES.REDDIT,
  comment: "this is an edited value",
  dateObtained: "11/11/2011",
}))();

const mockFormMethods = (() => {
  ``;
  const { result } = renderHook(() =>
    useForm<CareerType>({
      resolver: zodResolver(Career),
      mode: "onChange",
      defaultValues: {
        company: "company",
        appointment: {
          position: "",
          rank: "",
          references: [],
        },
        skills: ["jest", "rtl"],
        references: [
          {
            field: "company",
            content: "",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                comment: "",
                dateObtained: "11/11/2011",
              },
              {
                referenceType: TYPES_OF_REFERENCES.REDDIT,
                comment: "",
                dateObtained: "11/11/2011",
              },
            ],
          },
          {
            field: "duration",
            content: "",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                comment: "",
                dateObtained: "11/11/2011",
              },
            ],
          },
          {
            field: "skills",
            content: "0",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                comment: "jest",
                dateObtained: "11/11/2011",
              },
            ],
          },
          {
            field: "skills",
            content: "1",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                comment: "rtl",
                dateObtained: "11/11/2011",
              },
            ],
          },
        ],
        certsToField: [
          {
            name: "cert1",
            issuedBy: "issued1",
            references: [
              {
                field: "name",
                content: "",
                sources: [mockSourceValue],
              },
              {
                field: "issuedBy",
                content: "",
                sources: [mockSourceValue],
              },
            ],
          },
        ],
        lastDrawnSalary: "10000",
        duration: "",
      },
    }),
  );
  return result.current;
})();

describe("hooks/useExistingReference", () => {
  it("No references matches", () => {
    const formValue = mockFormMethods.getValues();
    const { result } = renderHook(() =>
      useExistingReference({
        formValue,
        field: "lastDrawnSalary",
      }),
    );
    expect(result.current.stringText).toBe("");
    expect(result.current.filteredReference).toBeUndefined();
  });

  it("Reference match with single source", () => {
    const formValue = mockFormMethods.getValues();
    const { result } = renderHook(() =>
      useExistingReference({
        field: "duration",
        formValue,
      }),
    );
    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011`);
  });

  it("Reference match with multiple sources", () => {
    const formValue = mockFormMethods.getValues();
    const { result } = renderHook(() =>
      useExistingReference({
        field: "company",
        formValue,
      }),
    );
    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011 + 1 more`);
    expect(result.current.filteredReference.sources).toHaveLength(2);
  });
});

describe("hooks/useUpdateReference", () => {
  describe("CRUD references for single object type", () => {
    it("create source without existing reference", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "position",
          source: mockSourceValue,
        }),
      );
      expect(mockFormMethods.getValues().appointment.references).toHaveLength(
        1,
      );
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources.length,
      ).toBe(1);
    });

    it("create source with existing reference", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "position",
          source: mockSourceValue,
        }),
      );
      expect(mockFormMethods.getValues().appointment.references.length).toBe(1);
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources.length,
      ).toBe(2);
    });

    it("update existing source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "position",
          source: mockEditedSourceValue,
          sourceId: 1,
        }),
      );

      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources.length,
      ).toBe(2);
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources[1],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "position",

          sourceId: 1,
        }),
      );
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "position",

          sourceId: 0,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position"),
      ).toHaveLength(0);
    });

    afterAll(() => {
      mockFormMethods.reset();
    });
  });

  describe("CRUD references for string type", () => {
    it("create source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "duration",
          source: mockSourceValue,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter((item) => item.field === "duration")[0].sources,
      ).toHaveLength(2);
    });

    it("update existing source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "duration",
          source: mockEditedSourceValue,
          sourceId: 1,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter((item) => item.field === "duration")[0].sources[1],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "duration",
          sourceId: 1,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter((item) => item.field === "duration")[0].sources,
      ).toHaveLength(1);
    });

    afterAll(() => {
      mockFormMethods.reset();
    });
  });

  describe("CRUD references for string array type", () => {
    it("create source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "skills",
          source: mockSourceValue,
          arrayId: 0,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter(
            (item) => item.field === "skills" && item.content === "0",
          )[0].sources,
      ).toHaveLength(2);
    });

    it("update existing source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "skills",
          source: mockEditedSourceValue,
          arrayId: 1,
          sourceId: 0,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter(
            (item) => item.field === "skills" && item.content === "1",
          )[0].sources[0],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "skills",
          arrayId: 1,
          sourceId: 1,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter(
            (item) => item.field === "skills" && item.content === "1",
          )[0].sources,
      ).toHaveLength(1);
    });

    afterAll(() => {
      mockFormMethods.reset();
    });
  });

  describe("CRUD references for object array type", () => {
    it("create source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "name",
          source: mockSourceValue,
          arrayId: 0,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .certsToField[0].references.filter((item) => item.field === "name")[0]
          .sources,
      ).toHaveLength(2);
    });

    it("update existing source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "name",
          source: mockEditedSourceValue,
          arrayId: 0,
          sourceId: 1,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .certsToField[0].references.filter((item) => item.field === "name")[0]
          .sources[1],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      renderHook(() =>
        useUpdateReferences({
          formMethods: mockFormMethods,
          field: "name",
          arrayId: 0,
          sourceId: 1,
        }),
      );
      expect(
        mockFormMethods
          .getValues()
          .certsToField[0].references.filter((item) => item.field === "name")[0]
          .sources,
      ).toHaveLength(1);
    });

    afterAll(() => {
      mockFormMethods.reset();
    });
  });
});
