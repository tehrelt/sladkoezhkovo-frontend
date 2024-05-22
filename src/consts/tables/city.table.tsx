import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { useCities, useDeleteCity } from '@/hooks/dashboard/useCities';
import { City } from '@/lib/types/domain/city.dto';
import CreateCityForm from '@/components/forms/create/dashboard/CreateCityForm';

const COLUMNS: ColumnDef<City>[] = [
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
    cell: (cell) => <p>{datef(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Обновлён',
    cell: (cell) => <p>{cell.getValue() ? datef(cell.getValue()) : '-'}</p>,
  },
];

export const CITY_TABLE: DataTableOptions<City> = {
  title: 'Города',
  // @ts-ignore
  useData: useCities,
  deleter: useDeleteCity,
  createForm: <CreateCityForm />,
  columns: COLUMNS,
};
