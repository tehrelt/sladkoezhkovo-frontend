import { DataTableOptions } from '@/lib/types/options/table.options';
import { USER_TABLE } from './user.table';
import { CITY_TABLE } from './city.table';
import { APPLICATION_TABLE } from './application.table';
import { DISTRICT_TABLE } from './district.table';
import { PROPERTY_TYPE_TABLE } from './property-type.table';
import { CONFECTIONARY_TYPE_TABLE } from './confectionary-type.table';
import { UNIT_TABLE } from './unit.table';
import { PACKAGE_TABLE } from './package.table';
import { FACTORY_TABLE } from './factory.table';
import { PRODUCT_TABLE } from './product.table';

export const DATA_TABLES: Record<string, DataTableOptions> = {
  applications: APPLICATION_TABLE,
  users: USER_TABLE,
  cities: CITY_TABLE,
  districts: DISTRICT_TABLE,
  'property-types': PROPERTY_TYPE_TABLE,
  units: UNIT_TABLE,
  packages: PACKAGE_TABLE,
  'confectionary-types': CONFECTIONARY_TYPE_TABLE,
  factories: FACTORY_TABLE,
  products: PRODUCT_TABLE,
};

export const tableExists = (tableName: string) =>
  Object.keys(DATA_TABLES).includes(tableName);
