import api from "./axios";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export const register = async (data: RegisterDto) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginDto) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};