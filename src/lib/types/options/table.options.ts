import { ReactNode } from 'react';
import { ListDto } from '../list.dto';
import { FiltersDto } from '../../filters/index.dto';
import { DepsDto } from '../deps.dto';

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
  deleter?: (id: string) => IDeleter;
}

export interface IDeleter {
  deps?: DepsDto;
  depsLoading: boolean;
  mutate: () => void;
  deletePending: boolean;
}
