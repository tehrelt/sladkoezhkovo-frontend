import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { Package } from '@/lib/types/domain/package.dto';
import { usePackages } from '@/hooks/dashboard/usePackages';
import CreatePackageForm from '@/components/forms/create/CreatePackageForm';

const COLUMNS: ColumnDef<Package>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.PACKAGES}/${cell.getValue()}`}
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

export const PACKAGE_TABLE: DataTableOptions<Package> = {
  title: 'Виды фасовки',
  columns: COLUMNS,
  // @ts-ignore
  useData: usePackages,
  createForm: <CreatePackageForm />,
};
