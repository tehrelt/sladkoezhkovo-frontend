const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

import Cookies from 'js-cookie';

export class AccessTokenService {
  static get(): string | null {
    const token = Cookies.get(ACCESS_TOKEN);
    return token || null;
  }

  static set(value: string) {
    Cookies.set(ACCESS_TOKEN, value);
  }

  static remove() {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  }
}
