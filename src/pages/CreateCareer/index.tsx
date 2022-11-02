import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import Base from "../../components/Base";
import Form from "../../components/Form";
import { SchemaCareer, SchemaCareerType } from "../../validations/career";
import { zodResolver } from "@hookform/resolvers/zod";
import PopoverTextInput from "./components/PopoverTextInput";

const CreateCareer = () => {
  const methods = useForm<SchemaCareerType>({
    resolver: zodResolver(SchemaCareer),
    mode: "onChange",
    defaultValues: {
      company: "",
      position: "",
      duration: "",
      soi: [
        // UNCOMMENT IF YOU WANT MOCK EXISTING
        // {
        //   appliedTo: [],
        //   comments: "zhen shi de",
        //   dateObtained: new Date("10/10/2022"),
        //   serial: "12345678",
        //   sourceSubType: "Sub-Bird",
        //   sourceType: "Bird",
        // },
        // {
        //   appliedTo: [],
        //   comments: "zhen shi de",
        //   dateObtained: new Date("10/11/2022"),
        //   serial: "12345678",
        //   sourceSubType: "Sub-Cat",
        //   sourceType: "Cat",
        // },
        // {
        //   appliedTo: [],
        //   comments: "zhen shi de",
        //   dateObtained: new Date("10/12/2022"),
        //   serial: "12345678",
        //   sourceSubType: "Sub-Dog",
        //   sourceType: "Dog",
        // },
      ],
    },
  });

  const { formState, control, watch } = methods;

  const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false);
  const [openPositionPopover, setOpenPositionPopover] = React.useState(false);
  const [openDurationPopover, setDurationPopover] = React.useState(false);

  console.log("[INFO] Form State: ");
  console.log(watch());

  console.log("[INFO] Current Errors");
  console.log(formState.errors);

  return (
    <Base>
      <Form methods={methods} preventLeaving={true} useLocalStorage={false}>
        <div className={styles.container__career}>
          <PopoverTextInput
            label="Company"
            parentMethod={methods}
            parentFormName="company"
            parentFormControl={control}
            open={openCompanyPopover}
            setOpen={setOpenCompanyPopover}
          />

          <PopoverTextInput
            label="Position"
            parentMethod={methods}
            parentFormName="position"
            parentFormControl={control}
            open={openPositionPopover}
            setOpen={setOpenPositionPopover}
          />

          <PopoverTextInput
            label="Duration"
            parentMethod={methods}
            parentFormName="duration"
            parentFormControl={control}
            open={openDurationPopover}
            setOpen={setDurationPopover}
          />
        </div>
      </Form>
    </Base>
  );
};

export default CreateCareer;
