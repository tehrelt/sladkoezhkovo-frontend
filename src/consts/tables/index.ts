import { DataTableOptions } from '@/lib/types/options/table.options';
import { ROLE_TABLE } from './role.table';
import { USER_TABLE } from './user.table';
import { CITY_TABLE } from './city.table';

export const DATA_TABLES: Record<string, DataTableOptions> = {
  users: USER_TABLE,
  roles: ROLE_TABLE,
  cities: CITY_TABLE,
};

export const tableExists = (tableName: string) =>
  Object.keys(DATA_TABLES).includes(tableName);
