import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config()
const cloudinarySetup = async () =>{
    cloudinary.config({ 
    cloud_name: 'dpjw2ka96', 
    api_key: '389719355881165', 
    api_secret: '_-xbYJ2D-wGe3VXiFTn-lu46vOU' 
        // cloud_name:process.env.CLOUD_NAME, 
        // api_key:process.env.CLOUD_API_KEY, 
        // api_secret:process.env.CLOUD_API_SECRET 
      });
}

export const cloudinaryMediaUpload = async (file, folder) => {
    await cloudinarySetup();
    return new Promise((resolve) =>{
        cloudinary.uploader.upload(
            file,
            {
                resource_type: 'auto',
                folder:folder,
            },
            (err, result) => {
                if (err) throw err
                resolve({
                    url:result.secure_url,
                    id:result.public_id, 
                });
            }
        )
    })
}