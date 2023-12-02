import path from "path";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "db.sqlite"),
  logging: false,
});

export async function connectToDB(): Promise<boolean> {
  try {
    await sequelize.sync();
    console.log("DB connection established!");
    return true;
  } catch {
    console.log("DB connection could not be established!");
    return false;
  }
}

export default sequelize;
