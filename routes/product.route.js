import express from 'express';
import { getProducts, createProduct, singleProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js"
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';
const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.post('/', adminAuth, upload.array('images', 10), createProduct);

productRouter.get('/:id', singleProduct);

productRouter.put('/:id', adminAuth, updateProduct);

productRouter.delete('/:id', adminAuth, deleteProduct);


export default productRouter