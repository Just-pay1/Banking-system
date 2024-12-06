import express from "express"
import { authenticateDatabase } from "./database/database";
import accountRoutes from "./routes/accountRoutes";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api", accountRoutes);

app.listen(process.env.Port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  authenticateDatabase(); // check Db connection
})