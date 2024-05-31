import fs from 'fs'
// import userService from '../service/user.service.js';


const filePath = fs.realpathSync('./')

class userHandler {
    async registerController (req, res, next) {
        const { email, username, password } = req.body;
        const avatar = req.file;
        avatar ? console.log(filePath+'\\images\\'+req.file.filename) : console.log('no avatar')
        
    
    
        // const registered = await userService.register(username, password);
        return res.json({
            message: "Register Successfully",
            // token: registered
            user: req.body,
        });
    };
    async loginController (req, res, next) {

    }
}

const userController = new userHandler();
export default userController;