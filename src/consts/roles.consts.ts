export type ROLE = 'ADMIN' | 'MODERATOR' | 'SHOP_OWNER' | 'FACTORY_OWNER';

export const LOCAL_ROLES: Record<ROLE, string> = {
  ADMIN: 'Администратор',
  MODERATOR: 'Модератор',
  SHOP_OWNER: 'Владелец магазина',
  FACTORY_OWNER: 'Владелец фабрики',
};
