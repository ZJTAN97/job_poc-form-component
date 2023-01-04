const BASE_URL = "http://localhost:8080/api/v1/career";

export async function postNewCareer(newCareer: any): Promise<Response> {
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
