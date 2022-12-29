import React from "react";
import { ReactLocation, Router } from "@tanstack/react-location";
import { CreateEmployee } from "./pages/CreateEmployee";
import { EmployeeInfo } from "./pages/EmployeeInfo";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  const reactLocation = new ReactLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={reactLocation}
        routes={[
          {
            path: "/create-employee",
            element: <CreateEmployee />,
          },
          {
            path: "/career-info",
            element: <EmployeeInfo />,
          },
          {
            element: <EmployeeInfo />, // default fallback
          },
        ]}
      />
    </QueryClientProvider>
  );
};

export default App;
