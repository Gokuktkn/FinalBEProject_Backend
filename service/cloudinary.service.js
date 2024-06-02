import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import fs from 'fs'

config();
const filePath = fs.realpathSync('./')

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
                fs.unlinkSync(`${filePath}\\images\\${req.file.filename}`)
                throw(
                    {
                        message: err.message || err,
                        status: 500,
                        data: null
                    }
                )
            }
        })
    }
}
const cloudinaryService = new imageHandler();
export default cloudinaryService