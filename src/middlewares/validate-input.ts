import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // Allow multiple errors
        if (error) {
            const errors = error.details.map((del) => del.message);
            return next(new Error(errors.toString()));
        }
        next();
    };
};
export default validateRequest;