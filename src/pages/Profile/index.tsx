import { Button } from "@mantine/core";
import { useNavigate } from "@tanstack/react-location";
import React from "react";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Profile Page</div>
      <Button
        onClick={() => navigate({ to: "/create-profile", replace: true })}
      >
        Go back to creation
      </Button>
    </div>
  );
};

export default Profile;
