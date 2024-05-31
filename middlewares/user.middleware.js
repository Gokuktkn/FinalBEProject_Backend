// import JWTService from "../utils/jwt.js";

// export const createProfileValidator = async (req, res, next) => {
//     try {
//         if (!req.headers.authorization) {
//             throw new Error("Token required")
//         }
//         JWTService.verifyToken(req.headers.authorization.split(" ")[1])
//         if (!req.body) { throw new Error("Information cannot be blank") }
//         next();
//     } catch (e) {
//         next(e)
//     }
// }
class userHandler {
    registerMiddleware (req, res, next) {
        next()
    }
}
const userMiddleware = new userHandler();
export default userMiddleware;