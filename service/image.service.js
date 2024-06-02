import multer from 'multer';

class imageHandler {
    saveSingleImg() {
        try {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, 'images/')
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + '.jpg')
                }
            })
            const upload = multer({ storage: storage })
            return upload.single('avatar')
        }
        catch (e) {
            throw(
                {
                    message: "Something is wrong while creating image",
                    status: 500,
                    data: null
                }
            )
        }
    }
}

export const imageService = new imageHandler()