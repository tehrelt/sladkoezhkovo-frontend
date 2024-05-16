import { cn, fio, datef } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { useRef } from 'react';
import { ApplicationDto } from '@/lib/types/domain/application.dto';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { ApplicationService } from '@/services/application.service';
import { toast } from 'sonner';

type Props = {
  application: ApplicationDto;
  isLoading: boolean;
};

export default function ApplicationDataPage({ application, isLoading }: Props) {
  const { mutate } = useMutation({
    mutationKey: ['application', application?.id, 'approve'],
    mutationFn: async () => await ApplicationService.approve(application.id),
    onSuccess: () => {
      toast('Успешно одобрено');
    },
    onError: (e) => {
      toast('Ошибка при одобрении');
      console.log(e);
    },
  });

  return (
    <div className="flex gap-4">
      <Card className="px-4 py-2 w-[400px] relative">
        <CardHeader className="items-center gap-2">
          <div className="flex justify-end w-full">
            {isLoading ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <div>
                <Badge
                  className={cn(
                    application.approved ? 'bg-green-600' : 'bg-yellow-600',
                  )}
                  variant={'default'}
                >
                  Статус
                </Badge>
              </div>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="w-[128px] h-[128px] rounded-full" />
          ) : (
            <Avatar className="w-[128px] h-[128px]">
              <AvatarFallback>{application?.lastName.charAt(0)}</AvatarFallback>
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
                <p className="font-medium">{application?.lastName}</p>
                <p className="font-medium">
                  {application?.firstName} {application?.middleName}
                </p>
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {isLoading ? (
              <Skeleton className="w-[64px] h-4" />
            ) : (
              <p>@{application?.handle}</p>
            )}
          </CardDescription>
          <CardDescription>
            {isLoading ? (
              <Skeleton className="w-[64px] h-4" />
            ) : (
              <p>{LOCAL_ROLES[application?.role]}</p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!application?.approved && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Разрешить регистрацию?</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {application && (
                      <>Регистрация пользователя {fio(application)}?</>
                    )}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <p>
                      Это действие приведет к регистрации нового пользователя на
                      роль {LOCAL_ROLES[application?.role]}
                    </p>
                    <Separator className="my-2" />
                    <p>Фамилия: {application?.lastName}</p>
                    <p>Имя: {application?.firstName}</p>
                    <p>Отчеcтво: {application?.middleName}</p>
                    <p>Email: {application?.email}</p>
                    <p>Handle: {application?.handle}</p>
                    <Separator className="my-2" />
                    <p>Вы уверены?</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutate()}>
                    Продолжить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
      <Card className="px-4 py-8">
        <CardContent className="flex flex-col gap-2">
          <div>
            <p className="font-bold">Email</p>
            {isLoading ? (
              <Skeleton className="w-[128px] h-4" />
            ) : (
              <p>{application?.email}</p>
            )}
          </div>
          <Separator />
          <div>
            <p className="font-bold">Заявка подана </p>
            {isLoading ? (
              <Skeleton className="w-[128px] h-4" />
            ) : (
              <p>{datef(application?.createdAt)}</p>
            )}
          </div>
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
