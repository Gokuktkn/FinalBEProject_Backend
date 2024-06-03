import multer from 'multer';
import * as crypto from 'crypto'

class imageHandler {
    saveSingleImg() {
        try {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'images/avatar/')
                },
                filename: (req, file, cb) => {
                    cb(null, (Math.ceil(Math.random() * Date.now())) + (Math.ceil(Math.random() * Date.now())) + '.jpg')
                }
            })
            const upload = multer({ storage: storage })
            return upload.single('avatar')
        }
        catch (e) {
            throw (
                {
                    message: e.message || e,
                    status: 500,
                    data: null
                }
            )
        }
    }
    saveMultipleImg() {
        try {
            const randomString = crypto.randomBytes(8).toString('hex');
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'images/items/')
                },
                filename: (req, file, cb) => {
                    cb(null, (Math.ceil(Math.random() * Date.now())) + (Math.ceil(Math.random() * Date.now())) + '.jpg')
                }
            })
            const upload = multer({ storage: storage }).array('images');
            return upload
        }
        catch (e) {
            throw (
                {
                    message: e.message || e,
                    status: 500,
                    data: null
                }
            )
        }
    }
}

export const imageService = new imageHandler()