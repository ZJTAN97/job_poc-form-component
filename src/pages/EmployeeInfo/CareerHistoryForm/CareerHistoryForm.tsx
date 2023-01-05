import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../model/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStyles, MainContainer, Row } from "./styles";
import { Form } from "../../../components/Form";
import { Button } from "@mantine/core";
import { ArrayInput } from "./components/ArrayInput";
import { ReferencesTrigger } from "./components/References/ReferencesTrigger";
import {
  ReferenceStateContext,
  useReferencesStateMethods,
} from "./components/References";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();
  const referenceStateMethods = useReferencesStateMethods();
  const careerFormMethod = useForm<CareerType>({
    resolver: zodResolver(Career),
    mode: "onChange",
    defaultValues: {
      company: {
        value: {
          company: "",
        },
        references: [],
      },
      appointment: {
        value: {
          position: "",
          rank: "",
        },
        references: [],
      },
      skills: [
        {
          value: {
            skill: "",
          },
          references: [],
        },
      ],
      certs: [
        {
          value: {
            name: "",
            issuedBy: "",
          },
          references: [],
        },
      ],
    },
  });

  const submitFormHandler = careerFormMethod.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <ReferenceStateContext.Provider value={referenceStateMethods}>
      <MainContainer>
        <Form methods={careerFormMethod}>
          <Row>
            <Form.TextInput
              label={"Company"}
              name="company.value.company"
              className={classes.formTextInput}
            />
            <ReferencesTrigger field="company.value.company" />
          </Row>

          <Row>
            <Form.TextInput
              label={"Position"}
              name="appointment.value.position"
              className={classes.formTextInput}
            />
            <ReferencesTrigger field="appointment.value.position" />
          </Row>

          <Row>
            <Form.TextInput
              label={"Rank"}
              name="appointment.value.rank"
              className={classes.formTextInput}
            />
            <ReferencesTrigger field="appointment.value.rank" />
          </Row>

          <ArrayInput<CareerType>
            name="skills"
            defaultValue={{
              id: "",
              value: {
                skill: "",
              },
              references: [],
            }}
          />

          <ArrayInput<CareerType>
            name="certs"
            defaultValue={{
              id: "",
              value: {
                name: "",
                issuedBy: "",
              },
              references: [],
            }}
          />

          <Button mt={20} variant="light" fullWidth onClick={submitFormHandler}>
            Submit
          </Button>
        </Form>
      </MainContainer>
    </ReferenceStateContext.Provider>
  );
};
