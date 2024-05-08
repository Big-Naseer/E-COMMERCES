import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";
import  dotenv  from "dotenv";
dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    passReqToCallback: true,
}

const jwtStrategy = new JwtStrategy(options, async (req, payload, done) =>{
    console.log("Token Payload:", payload);
    try {
        const user = await User.findById(payload.userId);
        if(!user){
            return done(null, false, {message: 'Unau User'});
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }

});

export default jwtStrategy;