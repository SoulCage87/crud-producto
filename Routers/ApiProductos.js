import express from 'express';
import multer from 'multer';
const Producto = express();
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

import { getProducts, getProductsID, postProducts, dltProduct } from '../Controllers/ProductController.js';

Producto.use(express.json());

Producto.post('', upload.single('foto'), postProducts);
Producto.get('', getProducts);
Producto.get('/:id', getProductsID);
Producto.delete('/:id', dltProduct);

export {Producto}