import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectDB = async () => {
  return open({
    filename: "./src/db/db.sqlite",
    driver: sqlite3.Database,
  });
};
