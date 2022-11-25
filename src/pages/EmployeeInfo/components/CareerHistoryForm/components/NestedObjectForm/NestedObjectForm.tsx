import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import {
  Appointment,
  AppointmentType,
} from "../../../../../../model/career/Appointment";
import { InputRow, InputRowRef } from "../../styles";
import { ReferencePopup } from "../ReferencesPopup";
import { Col, ColTitle, Row } from "./styles";

interface NestedObjectFormProps {
  parentFormMethods: UseFormReturn<any>;
}

export const NestedObjectForm = ({
  parentFormMethods,
}: NestedObjectFormProps) => {
  const appointmentFormMethods = useForm<AppointmentType>({
    resolver: zodResolver(Appointment),
    mode: "onChange",
    defaultValues: {
      position: "",
      rank: "",
      references: [],
    },
  });

  const { control: appointmentControl, getValues: appointmentGetValues } =
    appointmentFormMethods;

  const { position: currentPosition, rank: currentRank } =
    appointmentGetValues();

  const { control: parentControl, setValue: setParentValue } =
    parentFormMethods;

  return (
    <Row>
      <Form
        methods={appointmentFormMethods}
        preventLeaving={true}
        useLocalStorage={true}
      >
        <ColTitle>Appointment Details</ColTitle>
        <Col>
          <InputRow>
            <Form.TextInput
              styles={{
                root: {
                  width: "100%",
                  maxWidth: "355px",
                },
              }}
              control={appointmentControl}
              label={"Position"}
              required
              name={"position"}
              onBlur={() => {
                setParentValue("appointment", appointmentGetValues());
              }}
            />
            <InputRowRef>
              <ReferencePopup
                key={currentPosition}
                field={"position"}
                content={currentPosition}
                parentControl={appointmentControl}
                setParentValue={setParentValue(
                  "appointment",
                  appointmentGetValues(),
                )}
              />
            </InputRowRef>
          </InputRow>
          <Form.TextInput
            styles={{
              root: {
                width: "100%",
                maxWidth: "355px",
              },
            }}
            control={appointmentControl}
            label={"Rank"}
            required
            name={"rank"}
            onBlur={() => {
              setParentValue("appointment", appointmentGetValues());
            }}
          />
        </Col>
      </Form>
    </Row>
  );
};
