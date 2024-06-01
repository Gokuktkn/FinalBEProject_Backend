import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { tokenModel } from "../models/token.model.js";
import { userModel } from "../models/user.model.js";
config();

class refreshTokenHandler {
    async createNew(token, email) {
        try {
            const refreshToken = jwt.sign({ token }, process.env.JWT_PRIVATE_KEY, {
                expiresIn: "7d",
                algorithm: "HS256",
                header: {
                    typ: "jwt"
                }
            })
            const owner = await userModel.findOne({ email })
            await tokenModel.create({
                owner,
                refreshToken,
            })
            return refreshToken
        } catch (e) {
            return {
                message: e,
                status: 500,
                data: null
            }
        }
    }
    validate() {

    }
}

const refreshTokenService = new refreshTokenHandler();
export default refreshTokenService