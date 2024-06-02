import fs from 'fs'
import Joi from "joi";
import { userModel } from "../models/user.model.js";

const filePath = fs.realpathSync('./')

class userHandler {
    registerMiddleware = async (req, res, next) => {
        const { email, username, password } = req.body;
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
                .min(8),
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
    loginMiddleware(req, res, next) {

    }
}
const userMiddleware = new userHandler();
export default userMiddleware;