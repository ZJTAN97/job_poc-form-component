import React from "react";
import "./index.css";
import { FormSchemaType, formSchema } from "../../validations";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";
import Form from "../../components/Form";
import { useNavigate } from "@tanstack/react-location";

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();

  const [characterNameError, setCharacterNameError] = React.useState("");
  const debouncedSearch = debounce((criteria: string) => {
    mockSearchCharacterNames(criteria, setCharacterNameError);
  }, 500);

  const formDefaultValues = {
    job: "HERO",
    characterName: "",
    bio: "",
    dateCreated: new Date(),
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="main__container">
      <div>
        <div className="title">Select Maplestory Job Type</div>
        <div className="title">Fill in the mandatory fields below</div>

        <Form
          useLocalStorage={true}
          preventLeaving={true}
          formSchema={formSchema}
          defaultValues={formDefaultValues}
          submitType={"button"}
          buttonChild={"Create Character"}
          buttonClassName={"create__btn"}
          submitCallback={() => navigate({ to: "/", replace: true })}
        >
          <Form.ChipSelection<FormSchemaType["job"]>
            selections={["HERO", "ADVENTURER", "RESISTANCE"]}
            name={"job"}
          />
          <Form.TextInput
            label={"Character Name"}
            name={"characterName"}
            customOnChange={debouncedSearch}
            className={"input"}
            error={
              characterNameError && (
                <a href={"/profile"}>
                  This name exists, did you mean this guy?
                </a>
              )
            }
          />
          <Form.TextArea
            name={"bio"}
            label={"Bio for Character"}
            className={"input"}
          />
          <Form.TextInput
            label={"Password"}
            name={"password"}
            className={"input"}
            type={"password"}
          />
          <Form.TextInput
            label={"Confirm Password"}
            name={"confirmPassword"}
            className={"input"}
            type={"password"}
          />
        </Form>
      </div>
    </div>
  );
};

export default CreateProfile;
