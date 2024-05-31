import { Router } from "express"
import { config } from "dotenv";
config();

const userRegister = Router();
const userLogin = Router();
const userEdit = Router();
const userDelete = Router();

userRegister.post('/register', )
userLogin.post('/login')
userEdit.post('/edit')
userDelete.post('/delete')

export { userRegister, userLogin, userEdit, userDelete }