import express from "express";
import dotenv from "dotenv";

import { router as shopRouter } from "@/src/shop";

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

app.use(shopRouter);

app.listen(PORT, () => {
  console.log(`Express Server is Running on PORT: ${PORT}`);
});
