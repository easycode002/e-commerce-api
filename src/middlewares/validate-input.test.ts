import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import validateRequest from './validate-input'; // Adjust the path according to your structure

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
            status: jest.fn().mockReturnThis(),
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

    it('should return an error if name is missing', () => {
        req.body = {
            description: 'This is a test category',
        };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"name" is required',
        }));
    });

    it('should return an error if description is missing', () => {
        req.body = {
            name: 'Test Category',
        };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: '"description" is required',
        }));
    });

    it('should return multiple errors if both fields are missing', () => {
        req.body = {};

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining('"name" is required'),
        }));
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.stringContaining('"description" is required'),
        }));
    });
});
