import React from "react";
import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "./Form/FormInput";
import Form from "./Form";
import { Button } from "@fluentui/react-components";
import { schema, Schema } from "./validations";

const App: React.FC = () => {
    const methods = useForm<Schema>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const { watch, formState, handleSubmit, control } = methods;
    const { isDirty, isValid, isSubmitting } = formState;

    return (
        <div className="container">
            <div className="title">
                React Hook Form Fluent UI Proof of Concept
            </div>
            <Form methods={methods}>
                <FormInput
                    type="input"
                    name="firstName"
                    label="First Name"
                    control={control}
                />
                <br></br>
                <FormInput
                    type="input"
                    name="lastName"
                    label="Last Name"
                    control={control}
                />
            </Form>
            <br></br>
            <Button>Submit</Button>
        </div>
    );
};

export default App;
