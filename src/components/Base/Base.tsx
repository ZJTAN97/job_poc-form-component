import React from "react";
import styles from "./index.module.css";
import { AppShell, Header, Navbar, Container } from "@mantine/core";
import { useNavigate } from "@tanstack/react-location";

interface BaseProps {
  children: React.ReactNode;
}

export const Base = ({ children }: BaseProps) => {
  const navigate = useNavigate();

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          LinkedOut
        </Header>
      }
      navbar={
        <Navbar width={{ base: 200 }} p="xs">
          <Container onClick={() => navigate({ to: "/career-info" })}>
            <div className={styles.selector}>Career Info</div>
          </Container>
          <Container onClick={() => navigate({ to: "/create-employee" })}>
            <div className={styles.selector}>Create Employee</div>
          </Container>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
