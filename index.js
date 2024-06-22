import express from 'express';
const app = express();
const port = 3000;
import { Producto } from './Routers/ApiProductos.js';

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/producto', Producto);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});