import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";

import Base from "../../components/Base";
import Form from "../../components/Form";
import { SchemaCareer, SchemaCareerType } from "../../validations/career";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover } from "@mantine/core";

const CreateCareer = () => {
  const methods = useForm<SchemaCareerType>({
    resolver: zodResolver(SchemaCareer),
    mode: "onChange",
    defaultValues: {
      company: "",
      position: "",
      duration: 0,
      soi: [],
    },
  });

  const { formState, handleSubmit, control, watch } = methods;
  const { isValid, isSubmitting } = formState;

  const [dropdownState, setDropdownState] = React.useState({
    first: false,
    second: false,
    third: false,
  });

  console.log("[INFO] Form State: ");
  console.log(watch());

  // need to seperate into 2 form states
  // one for the main career schema
  // one for the SOI schema

  return (
    <Base>
      <Form methods={methods} preventLeaving={true} useLocalStorage={false}>
        <div className="container__career">
          <div className="container__career_inputs">
            <Popover
              width={350}
              withArrow
              shadow="md"
              position="right"
              opened={dropdownState.first}
              onClose={() =>
                setDropdownState({ first: false, second: false, third: false })
              }
            >
              <Popover.Target>
                <div
                  onFocusCapture={() =>
                    setDropdownState({
                      first: true,
                      second: false,
                      third: false,
                    })
                  }
                >
                  <Form.TextInput
                    label={"Company"}
                    name={"company"}
                    control={control}
                    className={"inputs"}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Form.Dropdown
                  label={"Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["type1", "type2", "type3", "type3"]}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["subtype1", "subtype2", "subtype3", "subtype3"]}
                />
                <Form.TextInput
                  label={"Serial"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
                <Form.TextInput
                  label={"Comment"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
              </Popover.Dropdown>
            </Popover>
            <Popover
              width={350}
              withArrow
              shadow="md"
              position="right"
              opened={dropdownState.second}
              onClose={() =>
                setDropdownState({ first: false, second: false, third: false })
              }
            >
              <Popover.Target>
                <div
                  onFocusCapture={() =>
                    setDropdownState({
                      first: false,
                      second: true,
                      third: false,
                    })
                  }
                >
                  <Form.TextInput
                    label={"Position"}
                    name={"position"}
                    control={control}
                    className={"inputs"}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Form.Dropdown
                  label={"Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["type1", "type2", "type3", "type3"]}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["subtype1", "subtype2", "subtype3", "subtype3"]}
                />
                <Form.TextInput
                  label={"Serial"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
                <Form.TextInput
                  label={"Comment"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
              </Popover.Dropdown>
            </Popover>

            <Popover
              width={350}
              withArrow
              shadow="md"
              position="right"
              opened={dropdownState.third}
              onClose={() =>
                setDropdownState({ first: false, second: false, third: false })
              }
            >
              <Popover.Target>
                <div
                  onFocusCapture={() =>
                    setDropdownState({
                      first: false,
                      second: false,
                      third: true,
                    })
                  }
                >
                  <Form.TextInput
                    label={"Duration"}
                    name={"duration"}
                    control={control}
                    className={"inputs"}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Form.Dropdown
                  label={"Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["type1", "type2", "type3", "type3"]}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["subtype1", "subtype2", "subtype3", "subtype3"]}
                />
                <Form.TextInput
                  label={"Serial"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
                <Form.TextInput
                  label={"Comment"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                />
              </Popover.Dropdown>
            </Popover>
          </div>
          <div className="container__career_soi">
            <Form.TextInput
              label={"SOI | DATE"}
              name={"company"}
              control={control}
              className={"inputs"}
              disabled={true}
            />
            <Form.TextInput
              label={"SOI | DATE"}
              name={"position"}
              control={control}
              className={"inputs"}
              disabled={true}
            />
            <Form.TextInput
              label={"SOI | DATE"}
              name={"position"}
              control={control}
              className={"inputs"}
              disabled={true}
            />
          </div>
        </div>
      </Form>
    </Base>
  );
};

export default CreateCareer;
