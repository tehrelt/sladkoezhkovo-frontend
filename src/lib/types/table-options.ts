import { ReactNode } from 'react';

export interface DataTableOptions {
  title: string;
  columns: any;
  beforeTableContent?: ReactNode;
  afterTableContent?: ReactNode;

  useData(): { data: Promise<unknown[]>; isLoading: boolean };
}
