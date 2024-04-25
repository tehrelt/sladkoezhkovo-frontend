'use client';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import React from 'react';
import { PAGES } from '@/consts/pages.consts';
import { DATA_TABLES } from '@/consts/tables';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardTableView({ table }: { table: string }) {
  const { columns, useData, title, afterTableContent, beforeTableContent } =
    DATA_TABLES[table];

  const { data, isLoading } = useData();

  return (
    <div>
      <div className="py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={PAGES.DASHBOARD}>
                Панель управления
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {afterTableContent ? afterTableContent : ''}
      {isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.header!}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={c.id}>
                    <Skeleton className="h-8 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <DataTable data={data!} columns={columns} />
      )}
      {beforeTableContent ? beforeTableContent : ''}
    </div>
  );
}

export default DashboardTableView;
