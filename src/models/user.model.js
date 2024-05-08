import {Schema , model, mongoose} from 'mongoose';

const userSchema = new Schema({
   loginID : {
      type: String,
   },
   firstName:{
      type: String,
      required: true,
   },
   lastName:{
      type: String,
      required: true,
   },
   password:{
      type: String,
      required: true,
   },
   confirmPassword:{
      type: String,
      required: true,
   },
   email:{
      type: String,
      required: true,
      unique: true,
   },
   address:{
      type: String,
      required: true,
   },
   phone:{
      type: String,
      required: true,
   },
   gender:{
      type: String,
      required: true,
      enum: ['male','female'],
   },
   products:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
   }],
   cart: [{
      type: Schema.Types.ObjectId,
      ref: 'Cart',
   }],
},
{
   timestamps: true,
},
);
export default model('User', userSchema);