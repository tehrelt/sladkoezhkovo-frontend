import { ROLE } from '@/consts/roles.consts';

export type SignInDto = {
  login: string;
  password: string;
};

export type SignUpDto = {
  handle: string;
  email: string;
  password: string;
};

export type AuthResponseDto = {
  accessToken: string;
};

export type ProfileDto = {
  imageLink?: string;
  id: string;
  handle: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  role: ROLE;
};
