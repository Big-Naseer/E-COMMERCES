import express from "express";
import passport from "passport";
import { addProduct, deleteSingleProduct, getAllProducts, getSingleProduct, updateProduct } from "../../controllers/product.controller.js";
import upload from "../../config/multer.js";
const router = express.Router();

const requireAuth = passport.authenticate('jwt', {session: false});

router.post('/add-product',requireAuth, upload.array('images'), addProduct);
router.get('/', getAllProducts)
router.get('/product/:id', getSingleProduct)
router.delete('/product/:id', deleteSingleProduct)
router.patch('/product/:id', updateProduct)
export default router;