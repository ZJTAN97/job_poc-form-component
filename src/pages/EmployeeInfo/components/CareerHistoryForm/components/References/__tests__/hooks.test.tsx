import { renderHook } from "@testing-library/react";
import { CareerType } from "../../../../../../../model/career/Career";
import { TYPES_OF_REFERENCES } from "../../../../../../../model/common/Source";
import {
  sampleFormContext,
  tryGetAllReferences,
  useExistingReference,
} from "../hooks";

describe("Testing try get all references via just form context", () => {
  it("Testing this method", () => {
    const references = tryGetAllReferences<CareerType>(sampleFormContext);
    console.debug(references);
    expect(references.length).toEqual(4);
  });
});

describe("hooks/useExistingReference", () => {
  it("No references matches", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        field: "test",
        references: [
          {
            field: "test2",
            content: "",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                dateObtained: "",
                comment: "",
              },
            ],
          },
        ],
      }),
    );
    expect(result.current.stringText).toBe("");
    expect(result.current.filteredReference).toBeUndefined();
  });

  it("Reference match with single source", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        field: "test",
        references: [
          {
            field: "test",
            content: "",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                dateObtained: "11/11/2011",
                comment: "first",
              },
            ],
          },
        ],
      }),
    );

    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011`);
  });

  it("Reference match with multiple sources", () => {
    const { result } = renderHook(() =>
      useExistingReference({
        field: "test",
        references: [
          {
            field: "test",
            content: "",
            sources: [
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                dateObtained: "11/11/2011",
                comment: "first",
              },
              {
                referenceType: TYPES_OF_REFERENCES.FACEBOOK,
                dateObtained: "11/11/2011",
                comment: "second",
              },
            ],
          },
        ],
      }),
    );

    expect(result.current.stringText).toBe(`FACEBOOK\n11/11/2011 + 1 more`);
    expect(result.current.filteredReference).toMatchObject({
      field: "test",
      content: "",
      sources: [
        {
          referenceType: TYPES_OF_REFERENCES.FACEBOOK,
          dateObtained: "11/11/2011",
          comment: "first",
        },
        {
          referenceType: TYPES_OF_REFERENCES.FACEBOOK,
          dateObtained: "11/11/2011",
          comment: "second",
        },
      ],
    });
  });
});
