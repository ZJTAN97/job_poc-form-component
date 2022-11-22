// new Server({
//   routes() {
//     this.namespace = "api";
//     this.get("/employees/", () => {
//       return [
//         { name: "Aran" },
//         { name: "Evan" },
//         { name: "Luminous" },
//         { name: "Mercedes" },
//         { name: "Phantom" },
//       ];
//     });
//   },
// });

export default function mockSearchEmployee(
  searchValue: string,
  setError: (arg: string) => void,
) {
  fetch("/api/employees/")
    .then((response) => response.json())
    .then((data) => data.map((item: any) => item.name))
    .then((array: string[]) => {
      if (array.includes(searchValue)) {
        console.log("[INFO] Employee name already exists: " + searchValue);
        setError("Employee Name already exist!");
      } else {
        setError("");
      }
    });
}
