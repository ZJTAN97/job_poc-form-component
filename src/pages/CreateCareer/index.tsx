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
      soi: [],
    },
  });

  const { formState, handleSubmit, control, watch, getValues } = methods;

  const { isValid: isValidCareer, isSubmitting: isSubmittingCareer } =
    formState;

  const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false);
  const [openPositionPopover, setOpenPositionPopover] = React.useState(false);

  // console.log("[INFO] Form State: ");
  // console.log(watch());

  return (
    <Base>
      <Form methods={methods} preventLeaving={true} useLocalStorage={false}>
        <div className={styles.container__career}>
          <PopoverTextInput
            label="Company"
            parentFormName="company"
            parentFormControl={control}
            open={openCompanyPopover}
            setOpen={setOpenCompanyPopover}
            existingSOIdata={getValues().soi}
          />

          <PopoverTextInput
            label="Position"
            parentFormName="position"
            parentFormControl={control}
            open={openPositionPopover}
            setOpen={setOpenPositionPopover}
            existingSOIdata={getValues().soi}
          />

          <PopoverTextInput
            label="Duration"
            parentFormName="duration"
            parentFormControl={control}
            open={openPositionPopover}
            setOpen={setOpenPositionPopover}
            existingSOIdata={getValues().soi}
          />
        </div>
      </Form>
    </Base>
  );
};

export default CreateCareer;
