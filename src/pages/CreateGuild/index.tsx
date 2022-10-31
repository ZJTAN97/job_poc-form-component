import { Button, Popover } from "@mantine/core";
import { useForm } from "react-hook-form";
import React from "react";
import "./index.css";
import {
  guildFormSchema,
  GuildFormSchemaType,
  sourceOfDataSchema,
  SourceOfDataSchemaType,
} from "../../validations/guild";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form";

const CreateGuild = () => {
  const [openPopoverGuild, setOpenPopoverGuild] = React.useState(false);
  const [openPopoverAlliance, setOpenPopoverAlliance] = React.useState(false);

  const methods = useForm<GuildFormSchemaType>({
    resolver: zodResolver(guildFormSchema),
    mode: "onChange",
    defaultValues: {
      alliance: "",
      guild: "",
      sourceOfData: [],
    },
  });

  const { formState, control, watch, setValue, getValues } = methods;

  const sourceMethods = useForm<SourceOfDataSchemaType>({
    resolver: zodResolver(sourceOfDataSchema),
    mode: "onChange",
    defaultValues: {
      appliedTo: "",
      type: "ASIASOFT",
    },
  });

  const {
    formState: sourceFormState,
    control: sourceControl,
    watch: watchSource,
    getValues: getSourceValues,
    handleSubmit,
    reset,
  } = sourceMethods;

  console.log("--Guild Form--");
  console.log(watch());

  console.log("--Source Form--");
  console.log(watchSource());

  const applySOI = handleSubmit(async (data) => {
    setValue("sourceOfData", [...getValues().sourceOfData, data]);
    reset();
    setOpenPopoverGuild(false);
  });

  return (
    <div className="main__container">
      <div className="input__column">
        <Form methods={methods} useLocalStorage={true} preventLeaving={true}>
          <Popover
            position="right"
            opened={openPopoverGuild}
            onClose={() => setOpenPopoverGuild(!openPopoverGuild)}
          >
            <Popover.Target>
              <div onFocusCapture={() => setOpenPopoverGuild(true)}>
                <Form.TextInput
                  control={control}
                  label={"Guild"}
                  name={"guild"}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Form
                methods={sourceMethods}
                preventLeaving={true}
                useLocalStorage={true}
              >
                <Form.Dropdown
                  label={"Type"}
                  control={sourceControl}
                  name="type"
                  data={["ASIASOFT", "NEXON"]}
                />
                <Form.TextInput
                  control={sourceControl}
                  label="Applied To"
                  name="appliedTo"
                />
              </Form>
              <br></br>
              <Button onClick={applySOI}>Apply</Button>
            </Popover.Dropdown>
          </Popover>
          <br></br>
          {/* <Popover
            position="right"
            opened={openPopoverAlliance}
            onClose={() => setOpenPopoverAlliance(!openPopoverAlliance)}
          >
            <Popover.Target>
              <div onFocusCapture={() => setOpenPopoverAlliance(true)}>
                <Form.TextInput
                  control={control}
                  label={"Alliance"}
                  name={"alliance"}
                />{" "}
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              {" "}
              <Form
                methods={methods}
                preventLeaving={true}
                useLocalStorage={true}
              >
                <Form.TextInput control={control} label="Type" name="type" />
                <Form.TextInput
                  control={control}
                  label="appliedTo"
                  name="appliedTo"
                />
              </Form>
            </Popover.Dropdown>
          </Popover> */}
        </Form>
      </div>
      <div className="source__column">
        <h6>Source of info</h6>
        {getValues().sourceOfData.map((item, id) => (
          <div className="source__item" key={item.toString() + id}>
            {item.appliedTo} | {item.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateGuild;
