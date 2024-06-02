import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { tokenModel } from "../models/token.model.js";
import { userModel } from "../models/user.model.js";
config();

class refreshTokenHandler {
    async createNew(token, email) {
        try {
            const owner = await userModel.findOne({ email })
            const refreshToken = jwt.sign({ token }, process.env.JWT_PRIVATE_KEY, {
                expiresIn: "7d",
                algorithm: "HS256",
                header: {
                    typ: "jwt"
                }
            })
            await tokenModel.create({
                owner,
                refreshToken,
            })
            return refreshToken
        } catch (e) {
            throw {
                message: e.message || e,
                status: 500,
                data: null
            }
        }
    }
    async refreshNew(token, email) {
        try {
            const owner = await userModel.findOne({ email })
            const refreshToken = jwt.sign({ token }, process.env.JWT_PRIVATE_KEY, {
                expiresIn: "7d",
                algorithm: "HS256",
                header: {
                    typ: "jwt"
                }
            })
            const tokenDB = await tokenModel.findOne({ owner })
            await tokenModel.findOneAndUpdate({ owner }, { refreshToken, __v: tokenDB.__v+1 })

            return refreshToken
        }
        catch (e) {
            throw (
                {
                    message: e.message || e,
                    status: 500,
                    data: null
                }
            )
        }
    }
    async validate() {

    }
}

const refreshTokenService = new refreshTokenHandler();
export default refreshTokenService