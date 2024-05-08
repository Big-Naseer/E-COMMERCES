import jwt  from "jsonwebtoken";
import  dotenv  from "dotenv";

dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (user) => {
    const {_id} = user;

    const payload = {
        userId: _id,
    };

    return jwt.sign(payload , secretKey, {expiresIn: '1yr'})
}