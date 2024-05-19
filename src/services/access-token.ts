const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

import Cookies from 'js-cookie';

export class AccessTokenService {
  static get(): string | null {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token || null;
  }

  static set(value: string) {
    localStorage.setItem(ACCESS_TOKEN, value);
  }

  static remove() {
    localStorage.removeItem(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  }
}
