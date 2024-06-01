import Joi from "joi";
import { userModel } from "../models/user.model.js";
import { itemModel } from "../models/item.model.js"

class userHandler {
    registerMiddleware = async (req, res, next) => {
        const { email, username, password, confirmPassword } = req.body;
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

            confirmPassword: Joi.ref('password'),
        })
            .with('password', 'confirmPassword');

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
                confirmPassword
            })
            next()
        }
        catch (e) {
            next(e)
        }
    }
    loginMiddleware(req, res, next) {

    }
}
const userMiddleware = new userHandler();
export default userMiddleware;