import { Router } from "express"
import { imageService } from "../service/image.service.js";
import userController from "../controllers/user.controller.js";
import userMiddleware from "../middlewares/user.middleware.js";

const userRegister = Router();
const userLogin = Router();
const userEditProfile = Router();
const userEditPassword = Router();
const userDelete = Router();

userRegister.post('/register', imageService.saveSingleImg('avatar'), userMiddleware.register, userController.register)
userLogin.post('/login', userMiddleware.login, userController.login)
userEditProfile.put('/update/profile', imageService.saveSingleImg('avatar'), userMiddleware.updateProfile, userController.updateProfile)
userEditPassword.put('/update/password', userMiddleware.updatePassword, userController.updatePassword)
userDelete.delete('/delete')

export { userRegister, userLogin, userEditProfile, userEditPassword, userDelete }