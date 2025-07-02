import express from "express";
import fs, { read } from "fs";
import { v4 as uuidv4 } from "uuid";

// Configuracion express
const app = express();
const port = 3000;
app.use(express.json());

// Configuracion DB
/// Configuracion archivo json
const readData = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./db.json", "utf8"));
    return data;
  } catch (error) {
    console.log("Error al obtener la base de datos JSON", error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log("Error al obtener la base de datos JSON", error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
