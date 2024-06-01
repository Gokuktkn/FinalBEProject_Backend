import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

const cloudinaryConfig = {
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
}
cloudinary.config(cloudinaryConfig);


class imageHandler {
    async postAvatar(filePath) {
        return await cloudinary.uploader.upload(filePath, { public_id: Date.now() }, (err, res) => {
            if(err) {
                throw new Error(err)
            }
        })
    }
}
const cloudinaryService = new imageHandler();
export default cloudinaryService