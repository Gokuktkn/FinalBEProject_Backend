import { Router } from "express"
import { config } from "dotenv";

import userController from "../controllers/user.controller.js";
import { imageService } from "../service/image.service.js";
import userMiddleware from "../middlewares/user.middleware.js";

config();

const userRegister = Router();
const userLogin = Router();
const userEdit = Router();
const userDelete = Router();

userRegister.post('/register', imageService.saveSingleImg('avatar'), userMiddleware.registerMiddleware, userController.registerController)
userLogin.post('/login')
userEdit.post('/edit')
userDelete.post('/delete')

export { userRegister, userLogin, userEdit, userDelete }