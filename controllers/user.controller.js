import userService from '../service/user.service.js';
// TODO: MULTER PFP

export const registerController = async (req, res, next) => {
    const { username, password } = req.body;
    const registered = await userService.register(username, password);
    return res.json({
        message: "Register Successfully",
        token: registered
    });
};