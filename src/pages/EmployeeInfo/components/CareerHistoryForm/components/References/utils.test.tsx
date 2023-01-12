import { renderHook } from "@testing-library/react";
import { TYPES_OF_REFERENCES } from "../../../../../../model/common/Source";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Career, CareerType } from "../../../../../../model/career/Career";
import { getExistingReference } from "./utils";

const mockSourceValue = (() => ({
  referenceType: TYPES_OF_REFERENCES.FACEBOOK,
  comment: "",
  dateObtained: "11/11/2011",
}))();

const mockFormMethods = (() => {
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

describe("hooks/getExistingReference", () => {
  it("No references matches", () => {
    const { filteredReference, stringText } = getExistingReference({
      formMethodValue: mockFormMethods.getValues(),
      field: "lastDrawnSalary",
    });
    expect(stringText).toBe("");
    expect(filteredReference).toBeUndefined();
  });

  it("Reference match with single source", () => {
    const { filteredReference, stringText } = getExistingReference({
      formMethodValue: mockFormMethods.getValues(),
      field: "duration",
    });
    expect(stringText).toBe("FACEBOOK\n11/11/2011");
    expect(filteredReference.field).toBe("duration");
  });

  it("Reference match with multiple sources", () => {
    const { filteredReference, stringText } = getExistingReference({
      formMethodValue: mockFormMethods.getValues(),
      field: "company",
    });
    expect(stringText).toBe("FACEBOOK\n11/11/2011 + 1 more");
    expect(filteredReference.field).toBe("company");
  });
});
