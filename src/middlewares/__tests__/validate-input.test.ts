import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import validateRequest from '../validate-input';
import { InvalidInputError } from '../../utils/error';
// import InvalidInputError  from '../global-error';

describe('validateRequest Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    });

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should call next if validation succeeds', () => {
        req.body = {
            name: 'Test Category',
            description: 'This is a test category',
        };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return an InvalidInputError if name is missing', () => {
        req.body = {
            description: 'This is a test category',
        };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(InvalidInputError));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: "Validation failed",
            errors: expect.arrayContaining(['"name" is required']),
        }));
    });

    it('should return an InvalidInputError if description is missing', () => {
        req.body = {
            name: 'Test Category',
        };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(InvalidInputError));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: "Validation failed",
            errors: expect.arrayContaining(['"description" is required']),
        }));
    });

    it('should return multiple errors if both fields are missing', () => {
        req.body = {};

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(InvalidInputError));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: "Validation failed",
            errors: expect.arrayContaining(['"name" is required', '"description" is required']),
        }));
    });
});
