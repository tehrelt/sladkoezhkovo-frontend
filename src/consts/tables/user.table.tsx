import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { User } from '@/lib/types/user';
import { localDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { DataTable } from '../tables.consts';
import { useUsers } from '@/hooks/dashboard/useUsers';

export const USERS_COLUMNS: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.USERS}/${cell.getValue()}`}
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
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: (cell) => (
      <span className="text-sm">{LOCAL_ROLES[cell.getValue()]}</span>
    ),
  },
  {
    accessorKey: 'imageLink',
    header: 'Аватар',
    cell: (cell) => {
      const link = cell.getValue();
      return (
        <Avatar>
          <AvatarImage src={link || undefined} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата регистрации',
    cell: (cell) => <p>{localDate(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Дата обновления',
    cell: (cell) => <p>{cell.getValue() ? localDate(cell.getValue()) : '-'}</p>,
  },
];

export const USER_TABLE: DataTable = {
  title: 'Пользователи',
  columns: USERS_COLUMNS,
  // @ts-ignore
  useData: useUsers,
};
