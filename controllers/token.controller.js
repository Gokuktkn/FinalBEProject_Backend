import refreshTokenService from "../service/refreshToken.service.js";
import tokenService from "../service/token.service.js";

export const tokenController = async (req, res, next) => {
    const refreshToken = req.headers.authorization.split(' ')[1];
    try {
        const [owner, tokenDB] = await refreshTokenService.Validate(refreshToken);
        const newToken = tokenService.signToken({ username: owner.username, role: owner.ROLE, profile_picture: owner.profile_picture, id: owner.GLOBAL_ID })
        const newRT = await refreshTokenService.refreshNew(newToken, owner.GLOBAL_ID)

        return res.status(200).json(
            {
                message: "Successfully refresh token",
                status: 200,
                data: {
                    user: {
                        username: owner.username,
                        role: owner.ROLE,
                        profile_picture: owner.profile_picture,
                    },
                    token: newToken,
                    refreshToken: newRT
                }
            }
        )
    }
    catch(e) {
        next(e)
    }
}