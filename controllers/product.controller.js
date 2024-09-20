import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        const images = req.files;
        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )
        const product = new Product(
            {
                name,
                description,
                price: Number(price),
                category,
                subCategory,
                sizes: JSON.parse(sizes),
                bestseller: bestseller === "true" ? true : false,
                image: imagesUrl,
                date: Date.now()
            }
        )
        product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        })
    }
}

const singleProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json({
            success: true,
            message: "Product fetched successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message,
        })
    }
}

const updateProduct = async (req, res) => {
    try {

        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body)
        res.json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message,
        })
    }
}

export {
    singleProduct,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}