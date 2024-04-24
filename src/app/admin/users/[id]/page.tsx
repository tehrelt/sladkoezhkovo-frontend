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

interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = ({ params: { id } }: Props) => {
  const { user, isLoading } = useUser(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
              <BreadcrumbLink href="/admin/users">Пользователи</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user?.handle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4">
        <Card className="px-4 py-2">
          <CardHeader className="items-center gap-2">
            <Avatar className="w-[128px] h-[128px]">
              <AvatarImage src={user?.imageLink} />
              <AvatarFallback>{user?.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>
              {user?.lastName} {user?.firstName} {user?.middleName}
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
    </div>
  );
};

export default Page;
