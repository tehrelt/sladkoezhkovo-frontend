import { ReactNode } from 'react';
import { ListDto } from '../list.dto';

export interface DataTableOptions<T = any, U = any> {
  title: string;
  columns: any;
  beforeTableContent?: ReactNode;
  afterTableContent?: ReactNode;

  useData: () => { data: ListDto<T>; isLoading: boolean };
  createForm?: ReactNode;
}
