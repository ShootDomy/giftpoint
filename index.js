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

// Obtener Todos los usuarios
app.get("/users", (req, res) => {
  const data = readData();
  res.json(data.users);
});

// Obtener un usuario por Id
app.get("/users/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((user) => user.uuid === req.params.id);
  res.json(user);
});

// Crear un usuario
app.post("/users", (req, res) => {
  const data = readData();
  const body = req.body;
  const uuid = uuidv4();
  console.log("BODYY=====>> ", req.body);
  const user = {
    uuid,
    ...body,
  };

  data.users.push(user);
  writeData(data);
  res.json(user);
});

// Actualizar un usuario
app.put("/users/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((user) => user.uuid === req.params.id);
  user.email = req.body.email;
  user.password = req.body.password;
  writeData(data);
  res.json(user);
});

// Eliminar un usuario
app.delete("/users/:id", (req, res) => {
  const data = readData();
  const user = data.users.find((user) => user.uuid === req.params.id);
  data.users = data.users.filter((user) => user.uuid !== req.params.id);
  writeData(data);
  res.json(user);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
