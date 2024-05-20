import { ReactNode } from 'react';
import { ListDto } from '../list.dto';
import { FiltersDto } from '../../filters/index.dto';

export interface DataTableOptions<T = any, U = any> {
  title: string;
  columns: any;
  beforeTableContent?: ReactNode;
  afterTableContent?: ReactNode;

  useData: (pagination: FiltersDto) => {
    data: ListDto<T>;
    isLoading: boolean;
    queryKey: string[];
  };
  createForm?: ReactNode;

  deleter?: {
    prepare: (id: string) => number;
    mutate: (id: string) => void;
  };
}
