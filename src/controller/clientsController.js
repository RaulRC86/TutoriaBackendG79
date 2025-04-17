import { db } from "../db/database.js";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

export const agregarClientsController = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const query = "INSERT INTO clientes VALUES (DEFAULT, $1, $2, $3) RETURNING *";
    const values = [nombre, email, password];
    const result = await db.query(query, values);

    res.status(201).json({ message: "Cliente creado", cliente: result.rows });
  } catch (error) {
    console.log(error.message);
  }
};

export const obtenerClientsController = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM clientes ORDER BY id");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
  }
};

export const obtenerIDClientController = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM clientes WHERE id=$1", [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
  }
}

export const obtenerClientsControllerLimit = async (req, res) => {
  const {limit} = req.query;
  const limitNumber = parseInt(limit);

  try {
    const consultaLimit = "SELECT * FROM clientes LIMIT $1" 
    const {rows} = await db.query(consultaLimit, [limitNumber]);
    console.log(typeof limitNumber);
    res.status(200).json(rows);
    
  } catch (error) {
    console.log(error.message);
  }
}

export const eliminarClientsController = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("DELETE FROM clientes WHERE id=$1", [id]);
    res.status(200).json({ message: "Cliente eliminado", cliente: rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};

export const actualizarClientsController = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const consulta = "UPDATE clientes SET nombre=$1, email=$2 WHERE id=$3";
    const value = [nombre, email, id];
    const {rows} = await db.query(consulta, value);
    res.status(200).json({ message: "Cliente actualizado", cliente: rows });
  } catch (error) {
    console.log(error.message);
  }
  
}

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {

    if(!email || !password) {
      return res.status(400).json({ message: "Se requiere email y contraseña" });
    }

    const consulta = "SELECT * FROM clientes WHERE email=$1 AND password=$2";
    const values = [email, password];

    const {rows, rowCount} = await db.query(consulta, values);
    if(!rowCount) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const user = rows[0];
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login exitoso", token, user });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
}