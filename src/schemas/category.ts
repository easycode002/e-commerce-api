import Joi from 'joi';

// Joi schema for validating Category input
const categoryValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    isDelete: Joi.boolean().optional(),
    deleteAt: Joi.date().optional(),
    createAt: Joi.date().optional(),
    updateAt: Joi.date().optional()
});

export default categoryValidationSchema;
