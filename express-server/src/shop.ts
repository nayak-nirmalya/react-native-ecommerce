import express, { Request, Response } from "express";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { OrderItem, order_items, orders, products } from "@/src/db/schema";

export const router = express.Router();
