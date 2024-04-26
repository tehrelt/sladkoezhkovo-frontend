import { User } from '@/lib/types/user';
import { localDate } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '../ui/separator';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Label } from '@radix-ui/react-label';
import { Input } from 'postcss';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import EditUser from '../forms/EditUser';
import { useRef } from 'react';

type Props = {
  user: User;
  isLoading: boolean;
};

interface ISubmit {
  submit: () => void;
}

export default function UserDataPage({ user, isLoading }: Props) {
  const ref = useRef<ISubmit>();

  return (
    <div className="flex gap-4">
      <Card className="px-4 py-2 w-[400px] relative">
        <div className="flex justify-end">
          <Sheet>
            <SheetTrigger>
              <Button className="px-2 py-1 self-end">
                <Pencil width={16} height={16} />
              </Button>
            </SheetTrigger>
            <SheetContent className="grid gap-4 py-4">
              <SheetHeader>
                <SheetTitle>Редактирование пользователя</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <EditUser ref={ref} user={user} />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={() => ref.current!.submit()}>
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <CardHeader className="items-center gap-2">
          {isLoading ? (
            <Skeleton className="w-[128px] h-[128px] rounded-full" />
          ) : (
            <Avatar className="w-[128px] h-[128px]">
              <AvatarImage src={user.imageLink || undefined} />
              <AvatarFallback>{user?.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <CardTitle>
            {isLoading ? (
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="h-4 w-[240px]" />
                <Skeleton className="h-4 w-[360px]" />
              </div>
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
            {isLoading ? (
              <Skeleton className="w-[64px] h-4" />
            ) : (
              <p>@{user?.handle}</p>
            )}
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
            {isLoading ? (
              <Skeleton className="w-[128px] h-4" />
            ) : (
              <p>{user?.email}</p>
            )}
          </div>
          <Separator />
          <div>
            <p className="font-bold">Зарегистрирован с </p>
            {isLoading ? (
              <Skeleton className="w-[128px] h-4" />
            ) : (
              <p>{localDate(user?.createdAt)}</p>
            )}
          </div>
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
