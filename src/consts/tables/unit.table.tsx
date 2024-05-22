import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { Unit } from '@/lib/types/domain/unit.dto';
import { useDeleteUnit, useUnits } from '@/hooks/dashboard/useUnits';
import CreateUnitForm from '@/components/forms/create/dashboard/CreateUnitForm';

const COLUMNS: ColumnDef<Unit>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.UNITS}/${cell.getValue()}`}
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

export const UNIT_TABLE: DataTableOptions<Unit> = {
  title: 'Единицы измерения',
  columns: COLUMNS,
  // @ts-ignore
  useData: useUnits,
  createForm: <CreateUnitForm />,
  deleter: useDeleteUnit,
};
