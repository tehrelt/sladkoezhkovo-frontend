import { ReactNode } from 'react';

export interface DataPageOptions<T = any> {
  title: string;

  itemNameKey: keyof T;

  render: (item: T, isLoading: boolean) => ReactNode;
  useData: (id: string) => { data: T | undefined; isLoading: boolean };
}
