import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../model/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStyles, MainContainer } from "./styles";
import { Form } from "../../../components/Form";
import { Button } from "@mantine/core";
import { ArrayInput } from "./components/ArrayInput";

interface CareerHistoryFormProps {
  setDrawer: (arg: boolean) => void;
}

export const CareerHistoryForm = ({ setDrawer }: CareerHistoryFormProps) => {
  const { classes } = useStyles();

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
      skills: [],
      certs: [],
    },
  });

  const submitFormHandler = careerFormMethod.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <MainContainer>
      <Form methods={careerFormMethod}>
        <Form.TextInput
          label={"Company"}
          name="company.value.company"
          className={classes.formTextInput}
        />
        <Form.TextInput
          label={"Position"}
          name="appointment.value.position"
          className={classes.formTextInput}
        />
        <Form.TextInput
          label={"Rank"}
          name="appointment.value.rank"
          className={classes.formTextInput}
        />

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
  );
};
