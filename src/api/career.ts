export async function getAllCareers() {
  const response = await fetch("http://localhost:8080/api/v1/career", {
    method: "get",
    mode: "no-cors",
  });

  console.log(response.json());

  //   const data = await response.json();

  return response;
}
