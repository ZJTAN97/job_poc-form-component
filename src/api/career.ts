import { CareerType } from "../model/career/Career";

const BASE_URL = "http://localhost:8080/api/v1/career";

export async function getCareers(): Promise<(CareerType & { id: string })[]> {
  const response = await fetch(`${BASE_URL}`, {
    method: "get",
  });
  const data = await response.json();
  return data;
}

export async function getCareerById(
  id: string,
): Promise<CareerType & { id: string }> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "get",
  });
  const data = await response.json();
  return data;
}

export async function postNewCareer(newCareer: CareerType): Promise<Response> {
  console.warn("[POST] Endpoint");
  return fetch(`${BASE_URL}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCareer),
  });
}

export async function putExistingCareer(
  existingCareer: CareerType,
  id: string,
): Promise<Response> {
  console.warn("[PUT] Endpoint");
  return fetch(`${BASE_URL}/${id}`, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(existingCareer),
  });
}
