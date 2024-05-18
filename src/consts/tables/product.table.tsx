import Link from 'next/link';
import Image from 'next/image';
import { DASHBOARD, PAGES } from '@/consts/pages.consts';
import { datef } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { Factory } from '@/lib/types/domain/factory.dto';
import { Product } from '@/lib/types/domain/product.dto';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import { useProducts } from '@/hooks/useProduct';

const COLUMNS: ColumnDef<Product>[] = [
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
    accessorKey: 'confectionaryType',
    header: 'Кондитерская категория',
    cell: (cell) => {
      const ct = cell.getValue() as ConfectionaryType;
      return (
        <Link
          href={`${PAGES.DASHBOARD}/${DASHBOARD.CONFECTIONARY_TYPES}/${ct.id}`}
          className="hover:underline"
        >
          {ct.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'factory',
    header: 'Фабрика',
    cell: (cell) => {
      const f = cell.getValue() as ConfectionaryType;
      return (
        <Link
          href={`${PAGES.DASHBOARD}/${DASHBOARD.FACTORIES}/${f.id}`}
          className="hover:underline"
        >
          {f.name}
        </Link>
      );
    },
  },

  {
    accessorKey: 'image',
    header: 'Фото',
    cell: (cell) => {
      const link = cell.getValue() as string;
      return (
        <Image src={link} width={48} height={48} alt={''} />
        // <Photo src={link} width={48} height={48} alt={''} />
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

export const PRODUCT_TABLE: DataTableOptions<Factory> = {
  title: 'Товары',
  columns: COLUMNS,
  // @ts-ignore
  useData: useProducts,
};
