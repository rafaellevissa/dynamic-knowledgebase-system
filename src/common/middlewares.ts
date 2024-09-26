import { Request, Response, NextFunction } from "express";
import { HttpException } from "./exceptions";

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