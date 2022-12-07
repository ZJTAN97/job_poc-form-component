import { useQuery, useMutation } from "react-query";
import { getCareerById, getCareers, postNewCareer } from "../api/career";
import { queryClient } from "../App";
import { CareerType } from "../model/career/Career";

export function useQueryCareerData() {
  const {
    data: allCareers,
    isLoading: isLoadingCareers,
    error: errorCareers,
  } = useQuery(["career"], () => getCareers());
  return {
    allCareers,
    isLoadingCareers,
    errorCareers,
  };
}

export function useQuerySelectedCareerData(id: string) {
  const {
    data: career,
    isLoading: isLoadingCareer,
    error: errorCareer,
  } = useQuery(["career", id], () => getCareerById(id));
  return {
    career,
    isLoadingCareer,
    errorCareer,
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
