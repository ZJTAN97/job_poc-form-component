## 1. Context & Problem Statement

<br>

Context

What is REFERENCES?

- REFERENCES is essentially source of information, for our customers to tag it to every piece of field/information they acquired.
- Sort of like a reference to where they got it from (imagine you are writing a paper and at the bottom you have references)

Problem Statement

How do we store such a data structure such that every piece of information is tagged to a Source and the Source can be uniquely identified to the piece of information.

Demo UI

- Open Empty Form
- Fill up all fields
- Mass Apply (to save time)
- Demo one edit, one delete, one add
- Submit Form
- Show Form Content
- Update Form

## 2. High Level Overview of Proposed Schema & Implementation

<br>

Proposed Schema

2 Key points

- Tagging to Field and Content
- The 4 different data types

```json
{
    id: "63bfcb8841e26678e0a30328",
    company: "Open Government Products",
    duration: "3 years",
    lastDrawnSalary: "10000",
    skills: ["React", "MongoDB"],
    references: [
      {
        field: "company",
        content: "Open Government Products",
        sources: [...],
      },
      {
        field: "duration",
        content: "3 years",
        sources: [...],
      },
      {
        field: "skills",
        content: "MongoDB",
        sources: [...],
      },
      {
        field: "skills",
        content: "React",
        sources: [...],
      },
    ],

    appointment: {
      position: "Software Engineer",
      rank: "Tech Lead",
      references: [
        {
          field: "position",
          content: "Software Engineer",
          sources: [...],
        },
        {
          field: "rank",
          content: "Tech Lead",
          sources: [...],
        },
      ],
    },

    certs: [
      {
        name: "Computer Science",
        issuedBy: "NUS",
        references: [
          {
            field: "name",
            content: "Computer Science",
            sources: [...],
          },
          {
            field: "issuedBy",
            content: "NUS",
            sources: [...],
          },
        ],
      },
    ],
  };
```

Frontend Implementation

- The main implementation challenge is the construction of the Form to fit the Proposed Schema
- For every REFERENCES, a helper function is used to check whether the field belongs to
  1. String Type
  2. String Array Type
  3. Object Type
  4. Array of Object Type
- Main UI Components and their business logic
  - Panel
  - Trigger
  - Main Form

Backend Implementation

- The main implementation challenge is to validate and sync document’s content and its source of information.

![Image from RY]

## 3. Conclusion

<br>

Key Points

- The proposed Schema has 4 main data types, each of which stores their own set of REFERENCESs.
- REFERENCESs are tagged to the field based on their field name and content
- Key thing is to ensure the syncing of REFERENCES with their fields through the content

Moving Forward & Future Challenges

Frontend Portion

- Abstractions
- Comprehensive Test Cases

Backend

- Swagger Documentation
- Handling mandatory and non-mandatory REFERENCESs for every field
