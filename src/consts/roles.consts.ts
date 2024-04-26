export enum ROLES {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SHOP_OWNER = 'shop_owner',
  FACTORY_OWNER = 'factory_owner',
  REGULAR = 'regular',
}

export const LOCAL_ROLES: Record<ROLES, string> = {
  [ROLES.ADMIN]: 'Администратор',
  [ROLES.MODERATOR]: 'Модератор',
  [ROLES.SHOP_OWNER]: 'Владелец магазина',
  [ROLES.FACTORY_OWNER]: 'Владелец фабрики',
  [ROLES.REGULAR]: 'Обычный пользователь',
};
