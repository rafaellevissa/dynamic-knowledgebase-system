import { Request, Response } from "express";
import UserController from "./user.controller";
import UserService from "./user.service";
import { HttpException } from "../common/exceptions";
import { UserRole } from "../common/data-types";

jest.mock("./user.service");

describe("UserController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let userService: UserService;

    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        userService = new UserService();
    });

    it("should register a user", async () => {
        req.body = { email: "test@example.com", password: "password", name: "user", role: UserRole.ADMIN };
        (userService.register as jest.Mock).mockResolvedValue(req.body);

        await UserController.register(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    it("should throw validation error on register", async () => {
        req.body = { email: "invalid-email" };

        await expect(UserController.register(req as Request, res as Response)).rejects.toThrow(HttpException);
    });

    it("should login a user", async () => {
        req.body = { email: "test@example.com", password: "password" };
        (userService.login as jest.Mock).mockResolvedValue({ token: "token" });

        await UserController.login(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    it("should throw validation error on login", async () => {
        req.body = { email: "invalid-email" };

        await expect(UserController.login(req as Request, res as Response)).rejects.toThrow(HttpException);
    });
});
