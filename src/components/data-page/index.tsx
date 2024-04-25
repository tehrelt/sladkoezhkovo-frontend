'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { PAGES } from '@/consts/pages.consts';
import { DATA_PAGES } from '@/consts/data-pages';

interface Props {
  table: string;
  id: string;
}

export const DataPage = ({ table, id }: Props) => {
  const { title, useData, render, itemNameKey } = DATA_PAGES[table];
  const { data, isLoading } = useData(id);

  return (
    <div>
      <>
        <div className="py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={PAGES.DASHBOARD}>Панель управления</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={`${PAGES.DASHBOARD}/${table}`}>{title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {isLoading ? (
                    <Skeleton className="h-4 w-[150px]" />
                  ) : (
                    <p>{data[itemNameKey]}</p>
                  )}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {render(data, isLoading)}
      </>
    </div>
  );
};
