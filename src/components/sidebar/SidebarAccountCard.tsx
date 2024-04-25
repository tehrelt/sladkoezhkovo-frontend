'use client';

import { useLogout } from '@/hooks/useLogout';
import { useProfile } from '@/hooks/useProfile';
import { cn, fio } from '@/lib/utils';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { AccountService } from '@/services/account.service';
import { toast } from 'sonner';

interface Props {
  className?: string;
}

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    return !!fileType && ['jpg', 'png', 'jpeg'].includes(fileType);
  }
  return false;
}

export default function SidebarAccountCard({ className }: Props) {
  const { push } = useRouter();

  const { isLoading, user, loggedOut } = useProfile();
  const { logout } = useLogout();

  const form = useForm();

  const { mutate } = useMutation({
    mutationKey: ['update-avatar'],
    mutationFn: AccountService.updateAvatar,
    onSuccess: () => {
      toast('Фото обновлено');
    },
  });

  if (isLoading) {
    return (
      <div className={cn(className)}>
        <div className="flex items-center  gap-4">
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full"></div>
      </div>
    );
  }

  if (loggedOut) {
    push('/');
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    await mutate(formData);
  };

  return (
    user && (
      <div className={cn(className)}>
        <div className="flex items-center  gap-4">
          <Avatar>
            <AvatarImage src={user.avatarLink || undefined} />
            <AvatarFallback>{user.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full">
            <div>
              <p>{fio(user)}</p>
              <p className="text-muted-foreground">@{user.handle}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDown color="black" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel> Мой аккаунт </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Редактировать профиль</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Выход
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-end w-full"></div>
      </div>
    )
  );
}
