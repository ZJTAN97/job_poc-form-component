import { useForm } from "react-hook-form";
import { Career, CareerType } from "../../../../model/Career";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Row,
  useStyles,
  MainContainer,
  TitleContainer,
  Title,
  SelectAll,
} from "./styles";
import { Form } from "../../../../components/Form";
import { Button, TextInput } from "@mantine/core";

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

  const addSkill = () => {
    const existing = careerFormMethod.getValues().skills;
    existing.push({
      value: {
        skill: "",
      },
      references: [],
    });

    careerFormMethod.setValue("skills", existing);
  };

  const submitFormHandler = careerFormMethod.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Form methods={careerFormMethod}>
      <Form.TextInput label={"Company"} name="company.value.company" />
      <Form.TextInput label={"Position"} name="appointment.value.position" />
      <Form.TextInput label={"Rank"} name="appointment.value.rank" />

      {careerFormMethod.getValues().skills.map((item) => (
        <TextInput />
      ))}

      <Button onClick={addSkill}>Add Skill</Button>
      <Button>Add Cert</Button>
      <Button onClick={submitFormHandler}>Submit</Button>
    </Form>
  );
};
