import Link from 'next/link';
import { DASHBOARD, PAGES } from '../pages.consts';
import { ColumnDef } from '@tanstack/react-table';
import { datef } from '@/lib/utils';
import { DataTableOptions } from '@/lib/types/options/table.options';
import { City } from '@/lib/types/domain/city.dto';
import {
  useDeletePropertyType,
  usePropertyTypes,
} from '@/hooks/dashboard/usePropertyTypes';
import { PropertyType } from '@/lib/types/domain/property-type.dto';
import CreatePropertyTypeForm from '@/components/forms/create/dashboard/CreatePropertyTypeForm';

const COLUMNS: ColumnDef<PropertyType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (cell) => (
      <Link
        href={`${PAGES.DASHBOARD}/${DASHBOARD.PROPERTY_TYPES}/${cell.getValue()}`}
        className="hover:underline"
      >
        {cell.getValue().substring(0, 13)}...
      </Link>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Тип собственности',
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

export const PROPERTY_TYPE_TABLE: DataTableOptions<PropertyType> = {
  title: 'Типы собственности',
  columns: COLUMNS,
  // @ts-ignore
  useData: usePropertyTypes,
  createForm: <CreatePropertyTypeForm />,
  deleter: useDeletePropertyType,
};
