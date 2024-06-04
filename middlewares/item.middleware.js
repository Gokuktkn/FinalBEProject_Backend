import Joi from "joi";

class itemHandler {
    async getItem(req, res, next) {
        res.send(req.files)
    }
    async createItem(req, res, next) {
        if (req.headers.authorization) {
            throw ({
                message: "Unauthorized action",
                status: 401,
                data: null
            })
        }
        const schema = Joi.object().keys({
            itemName: Joi.string()
                .required(),
            price: Joi.number()
                .min(4)
                .max(12)
                .required(),
            discount: Joi.number()
                .min(4)
                .max(12)
                .required(),
            variants: Joi.array(),
            food_type: Joi.string()
                .required()
        })
        res.send(req.files.map(e => e.filename))
    }
}

const itemMiddleware = new itemHandler();
export default itemMiddleware