import { Schema, model, mongoose } from "mongoose";

const productSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum : ['Accessories', 'Home Applience', 'Edu Material', 'sport kits']
    },
    // variant :[{
    //     type: String,
    //     required: true,
    // }],
    stock: {
        type: String,
        required: true,
    },
    owner:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    images: [{
        url: String,
        id: String,
    }]

},
{
  timestamps: true  
});

export default model('Product', productSchema);