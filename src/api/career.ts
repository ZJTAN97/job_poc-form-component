import { CareerType } from "../model/career/Career";

export async function getAllCareers(): Promise<CareerType[]> {
  const response = await fetch("http://localhost:8080/api/v1/career", {
    method: "get",
  });
  const data = await response.json();
  return data;
}

export async function postNewCareer(newCareer: CareerType): Promise<Response> {
  return fetch("http://localhost:8080/api/v1/career", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCareer),
  });
}
