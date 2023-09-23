import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

if (process.env.NODE_ENV === "production") {
  console.log("Running in PRODUCTION_MODE.");
  config({ path: ".prod.env" });
} else {
  console.log("Running in DEVELOPMENT_MODE.");
  config({ path: ".dev.env" });
}

const { DB_URL } = process.env;
const databaseUrl = drizzle(postgres(DB_URL!, { ssl: "require", max: 1 }));

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "drizzle" });
    console.log("Migration Complete!");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

main();
