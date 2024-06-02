import fs from 'fs'
import Joi from "joi";
import { userModel } from "../models/user.model.js";
import kryptoService from '../utils/hashing.js';
import tokenService from '../service/token.service.js';

const filePath = fs.realpathSync('./')

class userHandler {
    async register(req, res, next) {
        const { email, username, password } = req.body;
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            username: Joi.string()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                .required()
        })

        try {
            const existedUser = await userModel.findOne({ email });
            if (existedUser) {
                throw (
                    {
                        message: "Email đã tồn tại",
                        statusCode: 403,
                        stack: "MongoDB conflict"
                    }
                )
            }


            await schema.validateAsync({
                email,
                username,
                password,
            })
            next()
        }
        catch (e) {
            // delete file if something went wrong
            fs.unlinkSync(`${filePath}\\images\\${req.file.filename}`)
            next(e)
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                .required()
        })
        try {
            await schema.validateAsync({
                email,
                password,
            })
            const existedUser = await userModel.findOne({ email });
            if (!existedUser) {
                throw (
                    {
                        message: "Sai tài khoản hoặc mật khẩu",
                        statusCode: 403,
                        stack: "User input"
                    }
                )
            } else {
                const decryptedPassword = kryptoService.decrypt(password, existedUser.salt)
                if (existedUser.password != decryptedPassword) {
                    throw {
                        message: "Sai tài khoản hoặc mật khẩu",
                        statusCode: 403,
                        stack: "User input"
                    }
                }
            }

            next()
        }
        catch (e) {
            fs.unlinkSync(`${filePath}\\images\\${req.file.filename}`)
            next(e)
        }
    }
    async updateProfile(req, res, next) {
        const { username } = req.body
        const schema = Joi.object().keys({
            username: Joi.string()
                .min(3)
                .max(30)
                .required()
        })
        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!req.headers.authorization || !token) {
                throw (
                    { message: 'No credentials sent!', status: 403, data: null }
                );
            }

            tokenService.verifyToken(token);

            await schema.validateAsync({
                username
            })
            next()
        }
        catch(e) {
            next(e)
        }
    }
}
const userMiddleware = new userHandler();
export default userMiddleware;