import express, { Request, Response } from "express";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

import { OrderItem, order_items, orders, products } from "@/src/db/schema";

const router = express.Router();

const pool = new Pool({
  connectionString: `${process.env.DB_URL}`,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(pool);

const handleQueryError = (err: any, res: Response) => {
  console.error("Error Executing Query: ", err);
  res
    .status(500)
    .json({ error: "An error occurred while executing the query." });
};

router.get("/products", async (req: Request, res, Response) => {
  try {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  } catch (error) {
    handleQueryError(error, res);
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, +id));

    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json(product[0]);
  } catch (err) {
    handleQueryError(err, res);
  }
});

export { router };
