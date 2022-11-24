import { useQuery, useMutation } from "react-query";
import { getAllCareers, postNewCareer } from "../api/career";
import { queryClient } from "../App";
import { CareerType } from "../model/career/Career";

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

export function useSaveOrCreateCareer(newCareer: CareerType) {
  const { mutateAsync: saveOrCreateCareer } = useMutation(
    () => postNewCareer(newCareer),
    {
      onSuccess: () => {
        console.log("-- success --");
        queryClient.invalidateQueries(["career"]);
      },
      onError: (error) => {
        console.log("error leh");
        console.log(error);
      },
    },
  );
  return {
    saveOrCreateCareer,
  };
}
