import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv  from 'dotenv';
import routers from "./src/routes/index.js";
import { connectDB }  from './src/mongoDB/db.js';
import passport from 'passport';
import jwtStrategy from './src/middleware/jwt.strategy.js';

dotenv.config()
const app = express();

app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy)

routers(app);

const startServer = async () => {
   const PORT = process.env.PORT || 3000;
   try {
      connectDB(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      app.listen(PORT, ()=> {
         console.log(`App listening on port: ${PORT}`)
      })
   } catch (error) {
      console.log(error);
   }
}

startServer();

app.get('/'), async (req, res) => {
   return res.status(200).json({message:'app is running'});
}