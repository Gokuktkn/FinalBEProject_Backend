import Joi from "joi";

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
                .required(),

            confirmPassword: Joi.ref('password'),
        })
            .with('password', 'confirmPassword');

        try {
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