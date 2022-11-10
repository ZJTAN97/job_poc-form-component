import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";

import Base from "../../components/Base";
import Form from "../../components/Form";
import {
    SAUCE_TYPES,
    SchemaCareer,
    SchemaCareerType,
} from "../../validations/career";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Popover } from "@mantine/core";

const CreateCareer = () => {
    const methods = useForm<SchemaCareerType>({
        resolver: zodResolver(SchemaCareer),
        mode: "onChange",
        defaultValues: {
            company: "",
            position: "",
            duration: "",
            lastDrawnSalary: "",
            skills: ["DevOps", "Backend", "Frontend"],
            sauce: [],
        },
    });

    const { formState, control, watch, getValues } = methods;

    const [openSauceWindow, setOpenSauceWindow] = React.useState(false);
    const [showSkillInput, setShowSkillInput] = React.useState(false);

    console.log("[INFO] Form State: ");
    console.log(watch());

    console.log("[INFO] Current Errors");
    console.log(formState.errors);

    return (
        <Base>
            <Popover opened={openSauceWindow} position={"right"}>
                <Popover.Target>
                    <div className={styles.main__container}>
                        <Form
                            methods={methods}
                            preventLeaving={true}
                            useLocalStorage={false}
                        >
                            <h2>Career History</h2>
                            <div className={styles.container__flex}>
                                <div className={styles.container__col}>
                                    <Form.TextInput
                                        label={"Company"}
                                        name={"company"}
                                        control={control}
                                        className={styles.text__input}
                                    />
                                    <Form.TextInput
                                        label={"Position"}
                                        name={"position"}
                                        control={control}
                                        className={styles.text__input}
                                    />
                                    <div className={styles.skills__header}>
                                        Skill Sets
                                    </div>
                                    <div>
                                        {getValues().skills.map((item, id) => (
                                            <div
                                                className={styles.skills__item}
                                                key={item.toString() + id}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                        {showSkillInput && (
                                            <Form.TextInput
                                                label={"Skill Name"}
                                                className={styles.skills__input}
                                                control={control}
                                                name={"idkyet"}
                                            />
                                        )}
                                        <ActionIcon
                                            variant={"gradient"}
                                            className={styles.skills__button}
                                            onClick={() =>
                                                setShowSkillInput(
                                                    !showSkillInput
                                                )
                                            }
                                        >
                                            Add{" "}
                                        </ActionIcon>
                                    </div>
                                </div>
                                <div className={styles.container__col}>
                                    <Form.TextInput
                                        label={"Duration"}
                                        name={"duration"}
                                        control={control}
                                        className={styles.text__input}
                                    />
                                    <Form.TextInput
                                        label={"Last Drawn Salary"}
                                        name={"lastDrawnSalary"}
                                        control={control}
                                        className={styles.text__input}
                                    />
                                    <div className={styles.skills__header}>
                                        Skill Sets
                                    </div>
                                    <div>
                                        {getValues().skills.map((item, id) => (
                                            <div
                                                className={styles.skills__item}
                                                key={item.toString() + id}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                        {showSkillInput && (
                                            <Form.TextInput
                                                label={"Skill Name"}
                                                className={styles.skills__input}
                                                control={control}
                                                name={"idkyet"}
                                            />
                                        )}
                                        <ActionIcon
                                            variant={"gradient"}
                                            className={styles.skills__button}
                                            onClick={() =>
                                                setShowSkillInput(
                                                    !showSkillInput
                                                )
                                            }
                                        >
                                            Add{" "}
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.add__button}>
                                <Button
                                    onClick={() =>
                                        setOpenSauceWindow(!openSauceWindow)
                                    }
                                >
                                    Add more Sauces
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className={styles.popover__container}>
                        <h5>Apply SAUCE to Fields</h5>
                        <Form.Dropdown
                            label={"Sauce Type"}
                            control={control}
                            name={"sauceType"}
                            className={styles.dropdowns}
                            data={["Ketchup", "Chilli", "Mustard"]}
                        />
                        <Form.Dropdown
                            label={"Sauce Package"}
                            control={control}
                            name={"sauceSubType"}
                            className={styles.dropdowns}
                            data={["Packet", "Tub", "Bottle"]}
                        />
                        <Button className={styles.apply__button}>Apply</Button>
                    </div>
                </Popover.Dropdown>
            </Popover>
        </Base>
    );
};

export default CreateCareer;
