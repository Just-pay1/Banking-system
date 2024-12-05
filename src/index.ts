import express from "express"
import { sequelize, authenticateDatabase } from "./database/database";
import Account from "./models/Account";
const app = express();




app.listen(3000, () => {
  console.log("listens on port 3000");
})