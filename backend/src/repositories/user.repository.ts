import User, { IUser } from "../models/user.model";
import { RegisterUserDto } from "../types/auth.types";

class UserRepository {
  async create(userData: RegisterUserDto & { password: string }): Promise<IUser> {
    return await User.create(userData);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}

export default new UserRepository();