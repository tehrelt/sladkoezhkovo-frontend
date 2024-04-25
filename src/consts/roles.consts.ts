export enum ROLES {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  REGULAR = 'regular',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
  [ROLES.ADMIN]: 'Администратор',
  [ROLES.MODERATOR]: 'Модератор',
  [ROLES.REGULAR]: 'Обычный пользователь',
};
