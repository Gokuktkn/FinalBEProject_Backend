import jwt from "jsonwebtoken";
import { tokenModel } from "../models/token.model.js";
import { userModel } from "../models/user.model.js";
import { config } from "dotenv";
import tokenService from "./token.service.js";
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
                used: false,
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
    async refreshNew(token, GLOBAL_ID) {
        try {
            const owner = await userModel.findOne({ GLOBAL_ID })
            const refreshToken = jwt.sign({ token }, process.env.JWT_PRIVATE_KEY, {
                expiresIn: "7d",
                algorithm: "HS256",
                header: {
                    typ: "jwt"
                }
            })
            await tokenModel.findOneAndUpdate({ owner }, { refreshToken, used: false }, { new: true })

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
    async Validate(RT) {
        try {
            tokenService.verifyToken(RT);
            const token = jwt.decode(RT).token;
            const owner = await tokenService.infoToken(token)
            const tokenDB = await tokenModel.findOne({ owner })
            if (!tokenDB || tokenDB.refreshToken != RT) {
                throw {
                    message: "Token does not exist or invalid",
                    status: 403,
                    data: null
                }
            }
            return [owner, tokenDB]
        }
        catch (e) {
            throw {
                message: e.message,
                status: e.status,
                data: null
            }
        }
    }
    async deleteRefreshToken(token) {
        try {
            const user = await userModel.findOne({ email: jwt.decode(token).email });
            if (!user) {
                throw (
                    {
                        message: "User does not exist",
                        status: 404,
                        data: null
                    }
                )
            }
            const deletedToken = await tokenModel.findOneAndDelete({ owner: user._id });
            if (!deletedToken) {
                throw ({
                    message: 'User not found',
                    status: 404,
                    data: null
                });
            }
            return {
                message: 'User successfully deleted',
                status: 200,
                data: deletedToken
            };
        } catch (e) {
            throw ({
                message: e.message || e,
                status: 500,
                data: null
            })
        }
    }
}

const refreshTokenService = new refreshTokenHandler();
export default refreshTokenService