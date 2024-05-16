import { Role } from '@/lib/types/role.dto';
import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { fio, datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { useCities } from '@/hooks/dashboard/useCities';
import { City } from '@/lib/types/domain/city.dto';
import { useApplications } from '@/hooks/dashboard/useApplications';
import { LOCAL_ROLES } from '../roles.consts';

export const APPLICATION_COLUMNS: ColumnDef<Role>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.APPLICATIONS}/${cell.getValue()}`}
        className="hover:underline"
      >
        {cell.getValue().substring(0, 13)}...
      </Link>
    ),
  },
  {
    accessorKey: 'handle',
    header: 'Handle',
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
  },
  {
    accessorKey: 'firstName',
    header: 'Имя',
  },
  {
    accessorKey: 'middleName',
    header: 'Отчество',
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: (cell) => (
      <span className="text-sm">{LOCAL_ROLES[cell.getValue()]}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
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
  {
    accessorKey: 'approved',
    header: 'Обработан?',
    cell: (cell) => <p>{cell.getValue() ? 'Да' : 'Нет'}</p>,
  },
];

export const APPLICATION_TABLE: DataTableOptions<City> = {
  title: 'Заявки на регистрацию',
  columns: APPLICATION_COLUMNS,
  // @ts-ignore
  useData: useApplications,
};
