import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

export const db = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  allowExitOnIdle: true,
});

export const obtenerDB = async () => {
  try {
    const result = await db.query("SELECT current_database()");
    console.log(
      `Conectado a la base de datos ${result.rows[0].current_database}`
    );
  } catch (error) {
    console.log("Error al conectar a la base de datos", error.message);
  }
};
