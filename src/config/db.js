import fs from "fs";

const DB_PATH = "./src/db/db.json";

export const readData = () => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    return data;
  } catch (error) {
    console.error("Error al leer la base de datos JSON:", error);
    return { users: [] };
  }
};

export const writeData = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al escribir en la base de datos JSON:", error);
  }
};
