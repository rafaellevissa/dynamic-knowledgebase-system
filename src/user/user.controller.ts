import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";
import { UserLoginDTO, UserRegisterDto } from "./user.dto";
import UserService from "./user.service";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegisterDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [Admin, Editor, Viewer]
 *     UserLoginDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

export default class UserController {
    /**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterDto'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
    public static async register(req: Request, res: Response) {
        const payload = new UserRegisterDto(req.body)

        const errors = validateSync(payload);

        if (errors.length > 0) {
            throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
        }

        const userService = new UserService();

        const user = await userService.register(payload);

        return res.status(201).json(user);
    }


    /**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginDTO'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Validation error
 */
    public static async login(req: Request, res: Response) {
        const payload = new UserLoginDTO(req.body)

        const errors = validateSync(payload);

        if (errors.length > 0) {
            throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
        }

        const userService = new UserService();

        const user = await userService.login(payload.email, payload.password);

        return res.status(200).json(user);
    }
}
