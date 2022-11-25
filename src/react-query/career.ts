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

export function useSaveOrCreateCareer() {
  const { mutateAsync: saveOrCreateCareer } = useMutation(
    (newCareer: CareerType) => postNewCareer(newCareer),
    {
      onSuccess: (response) => {
        if (!response.ok) {
          console.log(response);
        } else {
          console.log("[SUCCESS] Created new Career History");
          queryClient.invalidateQueries(["career"]);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
  return {
    saveOrCreateCareer,
  };
}
