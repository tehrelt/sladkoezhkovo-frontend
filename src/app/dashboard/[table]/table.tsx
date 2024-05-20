'use client';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import React, { useState } from 'react';
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
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function DashboardTableView({ table }: { table: string }) {
  const {
    columns,
    useData,
    title,
    afterTableContent,
    beforeTableContent,
    createForm,
  } = DATA_TABLES[table];

  return (
    <div>
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
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {afterTableContent ? afterTableContent : ''}
      {/* {isLoading ? (
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
      ) : data ? (
        <DataTable fetcher={useData} columns={columns} />
      ) : (
        <span>Ошибка загрузки</span>
      )} */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Действия</CardTitle>
          </CardHeader>
          <CardContent>{createForm}</CardContent>
        </Card>
      </div>
      <DataTable fetcher={useData} columns={columns} />
      {beforeTableContent ? beforeTableContent : ''}
    </div>
  );
}

export default DashboardTableView;
