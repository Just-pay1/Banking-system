import express from "express"
import { sequelize, authenticateDatabase } from "./database/database";
const app = express();

authenticateDatabase()

app.listen(3000, () => {
  console.log("listens on port 3000");
})