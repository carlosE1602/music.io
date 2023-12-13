import { HttpService } from '../config';

const login = async (password: string, email: string) => {
  const { data } = await HttpService.post('/login', {
    password,
    email,
  });
  return data;
};

export const AuthService = {
  login,
};
