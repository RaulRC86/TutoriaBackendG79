import { db } from "../db/database.js";




export const eliminarLibrosController = async (req, res) => {
  const { id } = req.params;
  const {email} = req.user;
  try {
    const consulta  = "DELETE FROM books WHERE id=$1";
    const values = [id];
    const { rows } = await db.query(consulta, values);
    res.status(200).json({ message: `El usuario ${email} ha eliminado el libro ${id}`, libro: rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};

