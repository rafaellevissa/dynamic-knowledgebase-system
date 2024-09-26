import { Request, Response, NextFunction } from "express";
import { HttpException } from "./exceptions";
import { verify } from 'jsonwebtoken';
import { application } from "./config/constants";

export const exceptionsHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json(err.toObject());
    }

    console.log(err.message);
    return res.status(500).json({
        statusCode: 500,
        description: "Internal Server Error",
    });
};

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    verify(token, application.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.app.locals.auth = (decoded as any);
        next();
    });
};