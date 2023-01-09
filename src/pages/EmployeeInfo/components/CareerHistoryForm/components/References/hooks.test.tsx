import { render, renderHook } from "@testing-library/react";
import {
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../model/common/Source";
import { useUpdateReferences } from "./hooks";
import { useForm, FormProvider, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Career, CareerType } from "../../../../../../model/career/Career";

const mockSourceValue = (() => ({
  referenceType: TYPES_OF_REFERENCES.FACEBOOK,
  comment: "",
  dateObtained: "11/11/2011",
}))();

const mockDeleteSourceValue = (() => ({
  comment: "",
  dateObtained: "",
}))();

const mockEditedSourceValue = (() => ({
  referenceType: TYPES_OF_REFERENCES.REDDIT,
  comment: "this is an edited value",
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

const WrappedFormProvider = ({ children }: { children: React.ReactNode }) => {
  return <FormProvider {...mockFormMethods}>{children}</FormProvider>;
};

const UseUpdateReferenceTestComponent = ({
  field,
  arrayId,
  sourceId,
  source,
}: {
  field: Path<CareerType>;
  arrayId?: number;
  sourceId?: number;
  source: SourceType;
}) => {
  const { updateReference } = useUpdateReferences<CareerType>();
  updateReference({
    field,
    arrayId,
    sourceId,
    source,
  });
  return null;
};

describe("hooks/useUpdateReference", () => {
  describe("CRUD references for single object type", () => {
    beforeEach(() => {});

    it("create source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"position" as Path<CareerType>}
            source={mockSourceValue}
          />
        </WrappedFormProvider>,
      );
      expect(mockFormMethods.getValues().appointment.references.length).toBe(1);
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources.length,
      ).toBe(1);
    });

    it("update existing source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"position" as Path<CareerType>}
            sourceId={0}
            source={mockEditedSourceValue}
          />
        </WrappedFormProvider>,
      );
      expect(
        mockFormMethods
          .getValues()
          .appointment.references.filter((item) => item.field === "position")[0]
          .sources[0],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"position" as Path<CareerType>}
            sourceId={0}
            source={mockDeleteSourceValue}
          />
        </WrappedFormProvider>,
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
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"duration"}
            source={mockSourceValue}
          />
        </WrappedFormProvider>,
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter((item) => item.field === "duration")[0].sources,
      ).toHaveLength(2);
    });

    it("update existing source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"duration"}
            source={mockEditedSourceValue}
            sourceId={1}
          />
        </WrappedFormProvider>,
      );
      expect(
        mockFormMethods
          .getValues()
          .references.filter((item) => item.field === "duration")[0].sources[1],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"duration"}
            source={mockDeleteSourceValue}
            sourceId={1}
          />
        </WrappedFormProvider>,
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
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"skills"}
            source={mockSourceValue}
            arrayId={0}
          />
        </WrappedFormProvider>,
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
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"skills"}
            source={mockEditedSourceValue}
            arrayId={1}
            sourceId={0}
          />
        </WrappedFormProvider>,
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
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"skills"}
            source={mockDeleteSourceValue}
            arrayId={1}
            sourceId={1}
          />
        </WrappedFormProvider>,
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
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"name" as Path<CareerType>}
            source={mockSourceValue}
            arrayId={0}
          />
        </WrappedFormProvider>,
      );
      expect(
        mockFormMethods
          .getValues()
          .certsToField[0].references.filter((item) => item.field === "name")[0]
          .sources,
      ).toHaveLength(2);
    });

    it("update existing source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"name" as Path<CareerType>}
            source={mockEditedSourceValue}
            arrayId={0}
            sourceId={1}
          />
        </WrappedFormProvider>,
      );
      expect(
        mockFormMethods
          .getValues()
          .certsToField[0].references.filter((item) => item.field === "name")[0]
          .sources[1],
      ).toMatchObject(mockEditedSourceValue);
    });

    it("delete source", () => {
      render(
        <WrappedFormProvider>
          <UseUpdateReferenceTestComponent
            field={"name" as Path<CareerType>}
            source={mockDeleteSourceValue}
            arrayId={0}
            sourceId={1}
          />
        </WrappedFormProvider>,
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
