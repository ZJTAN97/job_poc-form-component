import { CareerType } from "../../../../../../model/career/Career";
import { ReferenceType } from "../../../../../../model/common/Reference";
import { TYPES_OF_REFERENCES } from "../../../../../../model/common/Source";

export const sampleFormValue: CareerType = {
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

export const sampleSourceValue = {
  referenceType: TYPES_OF_REFERENCES.FACEBOOK,
  comment: "",
  dateObtained: "11/11/2011",
};

export const sampleReferenceValue = {
  field: "position",
  content: "",
  sources: [sampleSourceValue],
};
