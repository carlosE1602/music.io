import { HttpService } from '../config';

const login = async (password: string, email: string) => {
  const { data } = await HttpService.post('/login', {
    password,
    email,
  });
  return data;
};

const createUser = async (email: string, password: string, nickname: string, genres: string[]) => {
  const { data } = await HttpService.post('/users', {
    password1: password,
    password2: password,
    nickname,
    email,
    genres,
  });
  return data;
};

export const AuthService = {
  login,
  createUser,
};
