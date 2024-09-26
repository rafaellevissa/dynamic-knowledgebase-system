import { Repository } from "typeorm";
import database from "../common/config/database";
import UserEntity from "./user.entity";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";

export default class UserService {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = database.manager.getRepository(UserEntity);
    }

    public async register(payload: Partial<UserEntity>) {
        const existingUser = await this.userRepository.findOne({ where: { email: payload.email } });
        if (existingUser) {
            throw new HttpException(HTTPStatusCode.CONFLICT, "Email already in use");
        }

        const user = this.userRepository.create(payload);
        await user.hashPassword();
        return user.save();
    }

    public async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(HTTPStatusCode.UNAUTHORIZED, "Invalid credentials");
        }

        const token = await user.generateToken();
        return { token };
    }
}
