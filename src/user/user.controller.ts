import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";
import { UserLoginDTO, UserRegisterDto } from "./user.dto";
import UserService from "./user.service";

export default class UserController {
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
