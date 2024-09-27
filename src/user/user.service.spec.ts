import { Repository } from "typeorm";
import UserService from "./user.service";
import UserEntity from "./user.entity";
import { HttpException } from "../common/exceptions";

describe("UserService", () => {
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(() => {
        userRepository = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
        } as unknown as Repository<UserEntity>;
        userService = new UserService();
        (userService as any).userRepository = userRepository;
    });

    it("should register a new user", async () => {
        const hashPassword = jest.fn();
        const payload = { email: "test@example.com", password: "password" };
        userRepository.findOne = jest.fn().mockResolvedValue(null);
        const save = jest.fn().mockResolvedValue(payload);
        const userEntity = {
            ...payload,
            hashPassword,
            save,
        }
        userRepository.create = jest.fn().mockReturnValue(userEntity);

        const result = await userService.register(payload);
        expect(hashPassword).toHaveBeenCalled()
        expect(result).toEqual(payload);
    });

    it("should throw an error if email is already in use", async () => {
        const payload = { email: "test@example.com", password: "password" };
        userRepository.findOne = jest.fn().mockResolvedValue(payload);

        await expect(userService.register(payload)).rejects.toThrow(HttpException);
    });

    it("should login a user", async () => {
        const payload = { email: "test@example.com", password: "password" };
        const user = { ...payload, comparePassword: jest.fn().mockResolvedValue(true), generateToken: jest.fn().mockResolvedValue("token") };
        userRepository.findOne = jest.fn().mockResolvedValue(user);

        const result = await userService.login(payload.email, payload.password);
        expect(result).toEqual({ token: "token" });
    });

    it("should throw an error for invalid credentials", async () => {
        userRepository.findOne = jest.fn().mockResolvedValue(null);

        await expect(userService.login("test@example.com", "wrongpassword")).rejects.toThrow(HttpException);
    });
});
