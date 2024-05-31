import Joi from "joi";

export const validateRequest = (schema) => async (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
        throw new Error(error);
    }

    return next();
};