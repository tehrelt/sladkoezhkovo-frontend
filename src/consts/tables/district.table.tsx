import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { District } from '@/lib/types/domain/district.dto';
import { useDistricts } from '@/hooks/dashboard/useDistricts';
import { CreateDistrictForm } from '@/components/forms/create/dashboard/CreateDistrictForm';

const COLUMNS: ColumnDef<District>[] = [
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
    header: 'Название района',
  },
  {
    accessorKey: 'city',
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

export const DISTRICT_TABLE: DataTableOptions<District> = {
  title: 'Районы',
  columns: COLUMNS,
  // @ts-ignore
  useData: useDistricts,
  createForm: <CreateDistrictForm />,
};
