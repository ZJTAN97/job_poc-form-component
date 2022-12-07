import { Button, Drawer, Loader, Table, Text } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { useQueryCareerData } from "../../react-query/career";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import { useStyles } from "./styles";

export const EmployeeInfo = () => {
  const { classes } = useStyles();
  const [openOption, setOpenOption] = React.useState(false);

  const { allCareers, isLoadingCareers, errorCareers } = useQueryCareerData();

  return (
    <Base>
      <Button onClick={() => setOpenOption(true)} className={classes.btn}>
        Click to add Career Record
      </Button>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openOption}
        onClose={() => setOpenOption(false)}
        className={classes.drawer}
      >
        <CareerHistoryForm setDrawer={setOpenOption} />
      </Drawer>
      {errorCareers ? (
        <div>Please check your server is on.</div>
      ) : !isLoadingCareers && allCareers ? (
        <Table mt={30} verticalSpacing={"lg"} horizontalSpacing={"lg"}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Appointment</th>
              <th>Duration</th>
              <th>Last Drawn Salary</th>
              <th>Skills</th>
              <th>Certs</th>
            </tr>
          </thead>
          <tbody>
            {allCareers.length === 0 && (
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={700}
              >
                No recorded career
              </Text>
            )}
            {allCareers.map((career, id) => (
              <tr
                key={career.toString() + id}
                onClick={() => console.log(career.id)}
              >
                <td>{career.company}</td>
                <td>
                  {career.appointment.position} | {career.appointment.rank}
                </td>
                <td>{career.duration}</td>
                <td>{career.lastDrawnSalary}</td>
                <td>
                  {career.skills.map((skill) => (
                    <div key={skill}>{skill}</div>
                  ))}
                </td>
                <td>TBA</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <Loader mt={30} />
        </div>
      )}
    </Base>
  );
};

export default EmployeeInfo;
