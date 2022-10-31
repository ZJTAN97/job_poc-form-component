import React from "react";
import "./index.css";
import { AppShell, Header, Navbar, Container } from "@mantine/core";
import { useNavigate } from "@tanstack/react-location";

interface BaseProps {
  children: React.ReactNode;
}

const Base = ({ children }: BaseProps) => {
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
        <Navbar width={{ base: 300 }} p="xs">
          <Container onClick={() => navigate({ to: "/create-profile" })}>
            <div className="selector">Create Character</div>
          </Container>
          <Container onClick={() => navigate({ to: "/create-career" })}>
            <div className="selector">Create Career</div>
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

export default Base;
