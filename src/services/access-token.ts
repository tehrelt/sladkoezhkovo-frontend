const ACCESS_TOKEN = 'accessToken';

import Cookies from 'js-cookie';

export class AccessTokenService {
  static get(): string | null {
    const token = Cookies.get(ACCESS_TOKEN);
    return token || null;
  }

  static set(value: string) {
    Cookies.set(ACCESS_TOKEN, value, {
      domain: 'localhost',
      expires: 1,
      sameSite: 'strict',
    });
  }

  static remove() {
    Cookies.remove(ACCESS_TOKEN);
  }
}
