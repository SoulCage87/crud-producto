import { db } from "../db/conn.js";

const  getProducts = async (req, res) => {
    try {
      const sql = `SELECT * FROM productos`
      const result = await db.query(sql);
      if(result.length > 0){
        res.json(result);
      }else{
        res.json({message: "No hay productos en la base de datos"});
      }
    } catch (error) {
        res.status(500).json(error.message)
    }
}