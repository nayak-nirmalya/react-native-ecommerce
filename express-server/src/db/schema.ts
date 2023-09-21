import {
  pgTable,
  serial,
  varchar,
  text,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  product_name: varchar("product_name", { length: 100 }).notNull(),
  product_category: varchar("product_category", { length: 100 }).notNull(),
  product_description: text("product_description").notNull(),
  product_price: doublePrecision("product_price").notNull(),
  product_stock: integer("product_stock").notNull(),
  product_image: text("product_image").notNull(),
});

// export const orders = {};

// export const order_items = {};
