'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { useUsers } from '@/hooks/admin/useUsers';
import { localDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {};

function UsersTable({}: Props) {
  const { users, isLoading } = useUsers();

  return (
    <div>
      <div className="py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Админ панель</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Пользователи</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Таблица пользователей </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Handle</TableHead>
                <TableHead>Фамилия</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Отчество</TableHead>
                <TableHead>Эл. почта</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Аватар</TableHead>
                <TableHead>Создан</TableHead>
                <TableHead>Обновлен</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell className="w-[120px]">
                        <Skeleton className="h-8 w-[120px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {users?.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="w-[150px]">
                        <Link
                          href={`/admin/users/${u.handle}`}
                          className="hover:underline"
                        >
                          {u.id.substring(0, 13)}...
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/admin/users/${u.handle}`}
                          className="hover:underline"
                        >
                          {u.handle}
                        </Link>
                      </TableCell>
                      <TableCell>{u.lastName}</TableCell>
                      <TableCell>{u.firstName}</TableCell>
                      <TableCell>{u.middleName}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{LOCAL_ROLES[u.role]}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={u.imageLink || undefined} />
                          <AvatarFallback>{u.handle.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{localDate(u.createdAt)}</TableCell>
                      <TableCell>
                        {u.updatedAt ? localDate(u.updatedAt) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersTable;
