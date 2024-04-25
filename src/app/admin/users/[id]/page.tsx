'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/admin/useUsers';
import { NextPage } from 'next';
// import * as dayjs from  'dayjs';
import dayjs from 'dayjs';
import { localDate } from '@/lib/utils';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = ({ params: { id } }: Props) => {
  const { user, isLoading } = useUser(id);

  return (
    <div>
      {user && (
        <>
          <div className="py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Админ панель</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/admin/users">Пользователи</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {isLoading ? (
                      <Skeleton className="h-4 w-[150px]" />
                    ) : (
                      user?.handle
                    )}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-4">
            <Card className="px-4 py-2 w-[400px]">
              <CardHeader className="items-center gap-2">
                <Avatar className="w-[128px] h-[128px]">
                  <AvatarImage src={user?.imageLink} />
                  <AvatarFallback>{user?.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>
                  {isLoading ? (
                    <Skeleton className="h-4 w-[360px]" />
                  ) : (
                    <div className="text-center">
                      <p className="font-medium">{user?.lastName}</p>
                      <p className="font-medium">
                        {user?.firstName} {user?.middleName}
                      </p>
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  <p>@{user?.handle}</p>
                </CardDescription>
                <CardDescription>
                  <p>{LOCAL_ROLES[user?.role]}</p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="px-4 py-8">
              <CardContent className="flex flex-col gap-2">
                <div>
                  <p className="font-bold">Email</p>
                  <p>{user?.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="font-bold">Зарегистрирован с </p>
                  <p>{localDate(user?.createdAt)}</p>
                </div>
                <Separator />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
