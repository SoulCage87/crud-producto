import { db } from "../db/conn.js";

/*GETS */
const getProducts = async (req, res) => {
  try {
    const sql = `SELECT * FROM productos`
    const result = await db.query(sql);
    
    if (result.length > 0) {
      res.json(result);
  } else {
      res.status(404).json({ message: "No data found." });
  }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getProductsID = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM productos WHERE id = $1`
    const result = await db.query(sql, [id]);
    if (result.length < 0) {
      res.json({ message: "No se encontró el producto" });
    } else {
      res.json(result);
    }
  } catch (e) {
    res.status(500).json(e.message)
  }
}

/*POSTS */
const postProducts = async (req, res) => {
  try {
    const { nombre, descripcion, precio, Estado, categoria } = req.body;
    const { buffer, mimetype, originalname } = req.file;

    const params = [nombre, descripcion, precio, Estado, categoria, buffer, mimetype, originalname]

    const sql = `INSERT INTO productos
                 (nombre, descripcion, precio, Estado, categoria, foto, mime_type, nombre_archivo)
                 VALUES
                 ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING *`

    const result = await db.query(sql, params);
    // Convertir el buffer a una cadena base64
    const base64Image = buffer.toString('base64');

    
    res.json({
     ...result,
      foto: `data:${mimetype};base64,${base64Image}`,
    });
  } catch (error) {
    res.status(500).json(error.message)
  }
}

/*DELETES */

const dltProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM productos WHERE id = $1`
    const result = await db.query(sql, [id]);

    if (result.length > 0) {
      res.json({ message: "No se encontró el producto con el id " + id });
    } else {
      res.json({ message: "Producto eliminado con éxito" });
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}


export { getProducts, postProducts, getProductsID, dltProduct }