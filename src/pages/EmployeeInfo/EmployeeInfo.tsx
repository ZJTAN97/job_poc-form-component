import { Button, Drawer, Loader, Table, Text } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { CareerType } from "../../model/career/Career";
import { useQueryCareerData } from "../../react-query/career";
import { CareerHistoryContent } from "./components/CareerHistoryContent";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import { useStyles } from "./styles";

export const EmployeeInfo = () => {
  const { classes } = useStyles();
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedTableRowId, setSelectedTableRowId] = React.useState("");
  const [openInfo, setOpenInfo] = React.useState(false);

  const { allCareers, isLoadingCareers, errorCareers } = useQueryCareerData();

  const [selectedCareerValue, setSelectedCareerValue] =
    React.useState<CareerType>();

  const openSelectedInfo = (id: string) => {
    setOpenInfo(false);
    setSelectedTableRowId(id);
    setOpenInfo(true);
  };

  return (
    <Base>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openCreate}
        onClose={() => {
          setOpenCreate(false);
          setSelectedCareerValue(undefined);
        }}
        className={classes.drawer}
      >
        <CareerHistoryForm
          setDrawer={setOpenCreate}
          selectedCareerValue={selectedCareerValue}
        />
      </Drawer>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openInfo}
        onClose={() => setOpenInfo(false)}
        className={classes.drawerContent}
      >
        <CareerHistoryContent
          currentId={selectedTableRowId}
          setOpenInfo={setOpenInfo}
          setOpenCreate={setOpenCreate}
          setSelectedCareerValue={setSelectedCareerValue}
        />
      </Drawer>

      <Button
        onClick={() => setOpenCreate(true)}
        className={classes.btn}
        disabled={openInfo}
      >
        Click to add Career Record
      </Button>

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
                className={classes.tableRow}
                key={career.toString() + id}
                onClick={() => openSelectedInfo(career.id)}
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
                <td>
                  {career.certsToField.map((cert, id) => (
                    <div key={"cert_tr_" + id}>{cert.name}</div>
                  ))}
                </td>
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
