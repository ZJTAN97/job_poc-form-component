export async function getAllCareers() {
  const response = await fetch("http://localhost:8080/api/v1/career", {
    method: "get",
  });

  const data = await response.json();
  console.log(data);

  return response;
}
