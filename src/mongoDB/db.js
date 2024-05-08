import {MongoClient} from "mongodb";
import mongoose from "mongoose";

export const connectDB = async (connectionString) => {

    try {
        const client = new MongoClient(connectionString);
        client.connect((err)=>{
            const collection = client.db("").collection("");
            console.log(collection.find());
        });
        const Connect = await mongoose.connect(connectionString)
        console.log(`DB connected`)
    } catch (error) {
        console.log(`DB connection failed ${error}`)
        process.exit(1); 
    }
}