import multer from 'multer';

class imageHandler {
    saveSingleImg() {
        try {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'images/')
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + '.png')
                }
            })
            const upload = multer({ storage: storage })
            return upload.single('avatar')
        }
        catch (e) {
            next(400)
        }
    }
}

export const imageService = new imageHandler()