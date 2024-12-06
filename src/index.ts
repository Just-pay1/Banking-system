import express from "express"
import { sequelize, authenticateDatabase } from "./database/database";
import Account from "./models/accountmodel";
import accountRoutes from "./routes/accountRoutes";

const app = express();
app.use(express.json());

app.use("/api/accounts", accountRoutes);

app.listen(3000, () => {
  console.log("listens on port 3000");
})