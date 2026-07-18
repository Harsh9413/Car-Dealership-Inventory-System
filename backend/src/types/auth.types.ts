export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface LoginUserDto {
  email: string;
  password: string;
}