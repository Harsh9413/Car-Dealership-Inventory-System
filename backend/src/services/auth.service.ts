import bcrypt from "bcrypt";
import { IUser } from "../models/user.model";
import userRepository from "../repositories/user.repository";
import { RegisterUserDto } from "../types/auth.types";
import { ConflictError } from "../utils/httpErrors";

class AuthService {
  async register(userData: RegisterUserDto): Promise<IUser> {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}

export default new AuthService();