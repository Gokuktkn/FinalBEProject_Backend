import fs from 'fs'
import cloudinaryService from '../service/cloudinary.service.js';
import kryptoService from '../utils/hashing.js';
import userService from '../service/user.service.js';
import tokenService from '../service/token.service.js';
import refreshTokenService from '../service/refreshToken.service.js';



const filePath = fs.realpathSync('./')

class userHandler {
    async registerController(req, res, next) {
        const { email, username, password } = req.body;

        // avatar creating can be null
        let avatar
        if (req.file) {
            const avatarData = await cloudinaryService.postAvatar(`${filePath}\\images\\${req.file.filename}`)
            avatar = avatarData.url
            // delete file after upload to cloudinary
            fs.unlinkSync(`${filePath}\\images\\${req.file.filename}`)
        }
        else {
            avatar = 'https://res-console.cloudinary.com/diy1mtz8k/media_explorer_thumbnails/dc5f943feaa11cc28078ac3faf9a95ea/detailed'
        }

        // encrypt password, salt and save in database
        const [newPassword, salt] = kryptoService.encrypt(password)

        // save information of user in database, with new password as encrypted and their salt
        const newUser = await userService.createUser(email, username, newPassword, salt, avatar)

        // create token and refresh token with new user as payload
        const token = tokenService.signToken({ username: newUser.username, role: newUser.ROLE, profile_picture: newUser.profile_picture })
        const refreshToken = await refreshTokenService.createNew(token, newUser.email);

        return res.json({
            message: "Register Successfully",
            status: 201,
            data: {
                user: {
                    username: newUser.username,
                    role: "user",
                    profile_picture: newUser.profile_picture,
                },
                token,
                refreshToken,
            },
        });
    };
    async loginController(req, res, next) {

    }
}

const userController = new userHandler();
export default userController;