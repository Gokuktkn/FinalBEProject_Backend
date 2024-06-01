import fs from 'fs'
import userService from '../service/user.service.js';
import cloudinaryService from '../service/cloudinary.service.js';
import kryptoService from '../utils/hashing.js';



const filePath = fs.realpathSync('./')

class userHandler {
    async registerController(req, res, next) {
        const { email, username, password } = req.body;
        let avatar
        if (req.file) {
            const avatarData = await cloudinaryService.postAvatar(`${filePath}\\images\\${req.file.filename}`)
            avatar = avatarData.url

            // delete this
            console.log(`${filePath}\\images\\${req.file.filename}`)
        }
        else {
            avatar = 'https://res-console.cloudinary.com/diy1mtz8k/media_explorer_thumbnails/dc5f943feaa11cc28078ac3faf9a95ea/detailed'
        }

        const [newPassword, salt] = kryptoService.encrypt(password)
        console.log(newPassword, salt)
        const newUser = await userService.createUser(email, username, newPassword, salt, avatar)

        return res.json({
            message: "Register Successfully",
            status: 201,
            data: {
                user: {
                    username: newUser.username,
                    role: "user",
                    profile_picture: newUser.profile_picture,
                }
            },
        });
    };
    async loginController(req, res, next) {

    }
}

const userController = new userHandler();
export default userController;