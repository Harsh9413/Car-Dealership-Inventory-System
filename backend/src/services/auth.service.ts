import bcrypt from "bcrypt";
import { IUser } from "../models/user.model";
import userRepository from "../repositories/user.repository";
import { RegisterUserDto } from "../types/auth.types";
import { ConflictError } from "../utils/httpErrors";
import { UnauthorizedError } from "../utils/httpErrors";
import { LoginUserDto } from "../types/auth.types";
import { generateToken } from "../utils/jwt";

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
  
  async login(loginData: LoginUserDto) {
  const user = await userRepository.findByEmail(loginData.email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
}

export default new AuthService();