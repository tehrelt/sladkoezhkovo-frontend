export enum ROLES {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
  [ROLES.ADMIN]: 'Администратор',
  [ROLES.REGULAR]: 'Обычный пользователь',
};
