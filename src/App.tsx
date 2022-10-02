import * as React from "react";
import { useForm } from "react-hook-form";
import Headers from "./Header";
import "./index.css";

let renderCount = 0;

type FormValues = {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    developer: string;
};

export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            age: 0,
            developer: "",
            gender: "",
        },
    });

    const { onChange, onBlur, disabled, required, name } = register(
        "firstName",
        {
            required: "This is required.",
        }
    );

    renderCount++;

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Headers
                renderCount={renderCount}
                description="Performant, flexible and extensible forms with easy-to-use validation."
            />
            <label htmlFor="firstName">First Name:</label>
            <input
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                required={required}
                name={name}
                // {...register("firstName", { required: "This is required." })}
                id="firstName"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}

            <label htmlFor="lastName">Last Name:</label>
            <input
                {...register("lastName", {
                    required: {
                        value: true,
                        message: "This is a required field",
                    },
                    minLength: {
                        value: 5,
                        message: "Minimum length of 5",
                    },
                    validate: (value) => {
                        return value === "bill";
                    },
                })}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <label htmlFor="age">Age</label>
            <input
                type="number"
                {...register("age", { valueAsNumber: true })}
                id="age"
            />

            <label htmlFor="gender"></label>
            <select {...register("gender")} id="gender">
                <option value="">Select...</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>

            <label htmlFor="developer">Are you a developer?</label>
            <input {...register("developer")} value="yes" type="checkbox" />

            <input type="submit" />
        </form>
    );
}
