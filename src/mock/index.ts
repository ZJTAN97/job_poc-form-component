import { Server } from "miragejs";

new Server({
    routes() {
        this.namespace = "api";
        this.get("/characters/", () => {
            return [
                { name: "Aran" },
                { name: "Evan" },
                { name: "Luminous" },
                { name: "Mercedes" },
                { name: "Phantom" },
            ];
        });
    },
});

export default function mockSearchCharacterNames(
    searchValue: string,
    setError: (arg: string) => void
) {
    fetch("/api/characters/")
        .then((response) => response.json())
        .then((data) => data.map((item: any) => item.name))
        .then((array: string[]) => {
            if (array.includes(searchValue)) {
                console.log(
                    "[INFO] Character name already exists: " + searchValue
                );
                setError("Character Name already exist!");
            } else {
                setError("");
            }
        });
}
