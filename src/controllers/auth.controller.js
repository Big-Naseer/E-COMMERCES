import User from "../models/user.model.js";
import cryptoHash from "crypto";
import { formatZodError } from "../utils/errorMessage.js";
import  { signUpValidator, signInValidator } from '../validators/auth.validator.js';
import { generateToken } from "../middleware/jwt.helper.js";
import { generateOTP, generateRandomNumber, hashOtp } from "../utils/idGenerator.js";
import { emailVerification } from "../utils/mails.js";

function hashValue(value) {
   const hash = cryptoHash.createHash('sha256');
   hash.update(value);
   return hash.digest('hex');
}

function comparePasswords(inputPassword, hashedPassword) {
   return hashValue(inputPassword) === hashedPassword;
 }

export const signUp = async (req, res, next) => {
   const registerResults = signUpValidator.safeParse(req.body)
   if (!registerResults) {
      return res.status(403).json(formatZodError(registerResults.error.issues))
   }
   try {
      const user = await User.findOne({email:req.body.email})
      if (user) {
         res.status(409).json({message: 'User already registered'})
      } else {
         const {
            firstName,
            lastName,
            password,
            confirmPassword,
            email,
            address,
            phone,
            gender
          } = req.body;

          if (password !== confirmPassword) {
            return res.status(403).json({ message:'Password and confirmPassword do not match'})
            }
            
         const encryptedPassword = hashValue(password);
         const randomNumber = generateRandomNumber(4);
         const userId = `USER${randomNumber}`;

         const newUser = new User({
            firstName,
            lastName,
            address,
            email,
            phone,
            gender,
            password: encryptedPassword,
            confirmPassword: encryptedPassword,
            loginID: userId
         })

         console.log(newUser.email, newUser.loginID, newUser.firstName, newUser.lastName)
         await emailVerification(newUser.email, newUser.loginID, newUser.firstName, newUser.lastName);
         await newUser.save();
         console.log('User saved successfully', newUser);
         res.status(201).json({message:'User registered successfully',newUser});
      }
   } catch (error) {
    res.status(500).json({message: error.message});
   }
}

export const signIn = async (req, res, next) => {
   const signInResults = signInValidator.safeParse(req.body)
   if(!signInResults){
      return res.status(403).json(formatZodError(signInResults.error.issues))
   }
   try {
      const {loginID, password} = req.body;
      const user = await User.findOne({loginID});
      if(!user){
         return res.status(404).json({message: 'Stupid Thief!!!!'});
      }
      if(!comparePasswords(password, user.password)) {
         return res.status(409).json({message: 'password not correct'});
      }
      const token = generateToken(user)
      return res.status(202).json({message: 'signed in succe', token});
   } catch (error) {
      res.status(500).json({message: error.message});
   }
};

export const sendOtp = async (req, res, next) => {
   try {
      const {id} = req.params

      const user = User.findById(id)
      if(!user) {
         console.log('User Not Found');
         return res.status(409).json({message: 'User Not Found'})
      }

      const otp = generateOTP()
      const hastedOtp = hashOtp(otp)

      await user.save()
   } catch (error) {
      
   }
}