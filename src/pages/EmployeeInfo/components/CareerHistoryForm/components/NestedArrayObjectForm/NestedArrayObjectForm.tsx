import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text } from "@mantine/core";
import React from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import {
  Certification,
  CertificationType,
} from "../../../../../../model/career/Certification";
import { Col, ColTitle, Row, useStyles } from "../../styles";
import { ReferencePopup } from "../ReferencesPopup";
import { CertContainer, CertLabel, CertRow } from "./styles";

interface NestedArrayObjectFormProps {
  parentFormMethods: UseFormReturn<any>;
}

export const NestedArrayObjectForm = ({
  parentFormMethods,
}: NestedArrayObjectFormProps) => {
  const { classes } = useStyles();

  const { control: parentControl, getValues: parentGetValues } =
    parentFormMethods;

  const { certs: currentCerts } = parentGetValues();

  const certFormMethods = useForm<CertificationType>({
    resolver: zodResolver(Certification),
    mode: "onChange",
    defaultValues: {
      issuedBy: "",
      name: "",
      references: [],
    },
  });

  const {
    control: certControl,
    setValue: certSetValue,
    handleSubmit: certHandleSubmit,
  } = certFormMethods;

  const [showAddCert, setShowAddCert] = React.useState(false);

  const { append } = useFieldArray({
    control: parentControl,
    name: "certs",
  });

  const certSubmitHandler = certHandleSubmit(async (data) => {
    append(data);
    certSetValue("issuedBy", "");
    certSetValue("name", "");
    setShowAddCert(false);
  });

  return (
    <Row>
      <Form
        methods={certFormMethods}
        preventLeaving={true}
        useLocalStorage={true}
      >
        <ColTitle>Certifications</ColTitle>
        <Col>
          {currentCerts.map((cert: CertificationType, id: number) => (
            <CertContainer key={cert.toString() + id}>
              <CertRow>
                <CertLabel>Name: {cert.name}</CertLabel>
                {/* <ReferencePopup
                  key={""}
                  field={"name"}
                  parentControl={certControl}
                  content={""}
                /> */}
              </CertRow>
              <CertRow>
                <CertLabel>Issuer: {cert.issuedBy}</CertLabel>
                {/* <ReferencePopup
                  key={""}
                  field={"issuedBy"}
                  parentControl={certControl}
                  content={""}
                /> */}
              </CertRow>
            </CertContainer>
          ))}
          {showAddCert ? (
            <>
              <Form.TextInput
                className={classes.formTextInput}
                control={certControl}
                label={"Name"}
                name={"name"}
                mb={20}
              />
              <Form.TextInput
                className={classes.formTextInput}
                control={certControl}
                label={"Issued by"}
                name={"issuedBy"}
                mb={20}
              />
              <Button size="xs" variant="light" onClick={certSubmitHandler}>
                Append
              </Button>
            </>
          ) : (
            <Button
              size="xs"
              variant="light"
              onClick={() => setShowAddCert(true)}
            >
              Add certifications
            </Button>
          )}
        </Col>
      </Form>
    </Row>
  );
};
