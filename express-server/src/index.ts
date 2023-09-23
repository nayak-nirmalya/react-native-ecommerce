import express from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  console.log("Running in PRODUCTION_MODE.");
  dotenv.config({ path: ".prod.env" });
} else {
  console.log("Running in DEVELOPMENT_MODE.");
  dotenv.config({ path: ".dev.env" });
}

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express Sever is Running on PORT: ${PORT}`);
});
