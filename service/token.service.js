import jwt from "jsonwebtoken";
// import { userModel } from "../models/user.model.js";
// import { uuid } from "uuidv4";
import { config } from "dotenv";
config();


class tokenHandler {
  signToken(payload) {
    try{
      const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "5m",
        algorithm: "HS256",
        header: {
          typ: "jwt"
        }
      });
      console.log(payload.role)
      return(token)
    }
    catch(e) {
      throw(
        {
          message: "Đã có lỗi xảy ra trong quá trình tạo token",
          status: 500,
          data: null
        }
      )
    }
  };
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
  }
  // async compareToken(token) {
  //   const user = await userModel.findOne({ GLOBAL_ID: jwt.decode(token).GLOBAL_ID })
  //   if (!user) {
  //     throw new Error("User does not exist")
  //   }
  //   else {
  //     return user
  //   }
  // }
  // async deleteToken(token) {
  //   try {
  //     const user = jwt.decode(token)
  //     const newID = uuid()
  //     await userModel.findOneAndUpdate({ GLOBAL_ID: user.GLOBAL_ID }, { GLOBAL_ID: newID })
  //     const { username } = await userModel.findOne({ GLOBAL_ID: newID })
  //     if (!username || username === undefined) {
  //       throw new Error("Account does not exist")
  //     } else {
  //       return username
  //     }
  //   } catch (e) {
  //     return e
  //   }
  // }
}
const tokenService = new tokenHandler();

export default tokenService;