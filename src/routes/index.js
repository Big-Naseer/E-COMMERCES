import authRoutes from './auth/auth.route.js';
import productRoute from './product/product.route.js'
const routers = (app) => {
   app.use("/auth", authRoutes);
   app.use("/products", productRoute)
 };
 
 export default routers;