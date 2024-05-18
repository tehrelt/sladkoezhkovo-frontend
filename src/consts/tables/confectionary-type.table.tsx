import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { City } from '@/lib/types/domain/city.dto';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import { useConfectionaryTypes } from '@/hooks/dashboard/useConfectionaryTypes';
import CreateConfectionaryTypeForm from '@/components/forms/create/dashboard/CreateConfectionaryTypeForm';

const COLUMNS: ColumnDef<ConfectionaryType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.CONFECTIONARY_TYPES}/${cell.getValue()}`}
        className="hover:underline"
      >
        {cell.getValue().substring(0, 13)}...
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Название',
  },
  {
    accessorKey: 'createdAt',
    header: 'Создан',
    cell: (cell) => <p>{datef(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Обновлён',
    cell: (cell) => <p>{cell.getValue() ? datef(cell.getValue()) : '-'}</p>,
  },
];

export const CONFECTIONARY_TYPE_TABLE: DataTableOptions<ConfectionaryType> = {
  title: 'Типы сладости',
  columns: COLUMNS,
  // @ts-ignore
  useData: useConfectionaryTypes,
  createForm: <CreateConfectionaryTypeForm />,
};
