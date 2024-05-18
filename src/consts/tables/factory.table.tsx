import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { datef } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { Factory } from '@/lib/types/domain/factory.dto';
import { useFactories } from '@/hooks/useFactory';
import { User } from '@/lib/types/domain/user';
import Mention from '@/components/ui/mention';
import { City } from '@/lib/types/domain/city.dto';

const COLUMNS: ColumnDef<Factory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.FACTORIES}/${cell.getValue()}`}
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
    accessorKey: 'handle',
    header: 'Handle',
  },
  {
    accessorKey: 'owner',
    header: 'Владелец',
    cell: (cell) => {
      const owner: User = cell.getValue() as User;
      return (
        <Link
          href={`${PAGES.DASHBOARD}/${DASHBOARD.USERS}/${owner.handle}`}
          className="hover:underline"
        >
          <Mention handle={owner.handle} />
        </Link>
      );
    },
  },
  {
    accessorKey: 'city',
    header: 'Город',
    cell: (cell) => {
      const city = cell.getValue() as City;
      return (
        <Link
          href={`${PAGES.DASHBOARD}/${DASHBOARD.CITIES}/${city.id}`}
          className="hover:underline"
        >
          {city.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'image',
    header: 'Аватар',
    cell: (cell) => {
      const link = cell.getValue();
      return (
        <Avatar>
          <AvatarImage src={(link as string) || undefined} />
          <AvatarFallback></AvatarFallback>
          {/* @ts-ignore */}
          {cell.row.getValue('handle').charAt(0)}
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата регистрации',
    cell: (cell) => <p>{datef(cell.getValue())}</p>,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Дата обновления',
    cell: (cell) => <p>{cell.getValue() ? datef(cell.getValue()) : '-'}</p>,
  },
];

export const FACTORY_TABLE: DataTableOptions<Factory> = {
  title: 'Фабрики',
  columns: COLUMNS,
  // @ts-ignore
  useData: useFactories,
};
