import { Role } from '@/lib/types/role.dto';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { localDate } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { useCities } from '@/hooks/dashboard/useCities';
import { City } from '@/lib/types/city.dto';

export const CITY_COLUMNS: ColumnDef<Role>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.CITIES}/${cell.getValue()}`}
        className="hover:underline"
      >
        {cell.getValue().substring(0, 13)}...
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Город',
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан ',
    cell: (cell) => <p>{localDate(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Обновлён',
    cell: (cell) => <p>{cell.getValue() ? localDate(cell.getValue()) : '-'}</p>,
  },
];

export const CITY_TABLE: DataTableOptions<City> = {
  title: 'Города',
  columns: CITY_COLUMNS,
  // @ts-ignore
  useData: useCities,
};
