import Product from "../models/product.model.js";
import { cloudinaryMediaUpload } from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
    const existingProduct = await Product.findOne({name: req.body.name})
    if (existingProduct){
        return res.status(409).json({message: 'Product Already exist'})
    }
    try {
        const uploader = async (path) => 
        await cloudinaryMediaUpload(path, 'E-commerce');
        const imageLink = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const clouldPath = await uploader(path);
            imageLink.push(clouldPath);
        
    }
        const {userId} = req.body;


        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            stock:req.body.stock,
            images: imageLink,
            owner: userId
        })
        await newProduct.save();
        return res.status(200).json({message: 'Product ', newProduct})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getAllProducts = async ( req, res) => {
try {
        const allProducts = await Product.find()
        if (!allProducts) {
            res.status(404).json({message: 'No products found in the DB'})
            conlose.log('No products found in the DB')
        } else{
            res.status(200).json({message: 'Products Found successfully', allProducts})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const singleProduct = await Product.findById(productId)
        if(!singleProduct){
            res.status(404).json({message: 'Product not found in the DB'})
            console.log('product not found')
        }
        res.status(200).json({message:"Product Fetched Successfully", singleProduct})
    } catch (error) {
        console.error('Error while getting a single product', error)
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const deleteSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if(!deleteProduct){
            return res.status(404).json({message: 'Product not found in the DB'})
            console.log('product not found')
        }
        res.status(200).json({message:'Product deleted succefully',deleteProduct})
    } catch (error) {
        console.error('Error while getting deleting product', error)
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const singleProduct = await Product.findByIdAndUpdate(productId,req.body, { new: true });
     
        if (!singleProduct) {
           return res.status(404).json({ message: 'Product not found' });
         }
         res.status(200).json({message:'Product updated successfully',singleProduct});
       } catch (error) {
         console.error('Error while updating product:', error);
         res.status(400).json({ message: error.message });
       }
}