import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { FormSchemaType, formSchema } from "../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";
import Form from "../../components/Form";
import { useNavigate } from "@tanstack/react-location";

const CreateProfile: React.FC = () => {
    const navigate = useNavigate();
    const methods = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            job: "HERO",
            characterName: "",
            bio: "",
            dateCreated: new Date(),
            password: "",
            confirmPassword: "",
        },
    });

    const { formState, handleSubmit, control } = methods;
    const { isValid, isSubmitting } = formState;

    const [characterNameError, setCharacterNameError] = React.useState("");

    const debouncedSearch = debounce((criteria: string) => {
        mockSearchCharacterNames(criteria, setCharacterNameError);
    }, 500);

    const submitForm = handleSubmit(async (data) => {
        navigate({ to: "/profile", replace: true });
        console.log(data);
    });

    return (
        <div className="main__container">
            <div>
                <div className="title">Select Maplestory Job Type</div>
                <div className="title">Fill in the mandatory fields below</div>

                <Form<FormSchemaType>
                    methods={methods}
                    useLocalStorage={true}
                    preventLeaving={true}
                    formSchema={formSchema}
                >
                    <Form.ChipSelection<FormSchemaType["job"]>
                        selections={["HERO", "ADVENTURER", "RESISTANCE"]}
                        name={"job"}
                        control={control}
                        disabled={isSubmitting}
                    />
                    <Form.TextInput
                        disabled={isSubmitting}
                        label={"Character Name"}
                        control={control}
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
                        disabled={isSubmitting}
                        name={"bio"}
                        label={"Bio for Character"}
                        control={control}
                        className={"input"}
                    />
                    <Form.TextInput
                        disabled={isSubmitting}
                        label={"Password"}
                        control={control}
                        name={"password"}
                        className={"input"}
                        type={"password"}
                    />
                    <Form.TextInput
                        disabled={isSubmitting}
                        label={"Confirm Password"}
                        control={control}
                        name={"confirmPassword"}
                        className={"input"}
                        type={"password"}
                    />
                    <Button
                        disabled={!isValid}
                        onClick={submitForm}
                        className="create__btn"
                    >
                        Create Character
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CreateProfile;
