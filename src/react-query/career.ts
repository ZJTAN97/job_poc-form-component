import { useQuery, useMutation } from "react-query";
import { getAllCareers, postNewCareer } from "../api/career";
import { queryClient } from "../App";

export function useQueryCareerData() {
  const {
    data: allCareers,
    isLoading: isLoadingCareers,
    error: errorCareers,
  } = useQuery(["career"], () => getAllCareers());
  return {
    allCareers,
    isLoadingCareers,
    errorCareers,
  };
}

export function useSaveOrCreateCareer() {
  const { mutateAsync: saveOrCreateCareer } = useMutation(
    () => postNewCareer(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["career"]);
      },
    },
  );
}
