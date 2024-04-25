import { DataTable } from '../tables.consts';
import { ROLE_TABLE } from './roles.table';
import { USER_TABLE } from './user.table';

export const DATA_TABLES: Record<string, DataTable> = {
  users: USER_TABLE,
  roles: ROLE_TABLE,
};
