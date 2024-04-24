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
  id: string;
  handle: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  avatarLink: string | null;
  role: string;
};
