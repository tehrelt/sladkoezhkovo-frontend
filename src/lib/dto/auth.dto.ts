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
