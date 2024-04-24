'use client';

import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';
import { cn, fio } from '@/lib/utils';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { ChevronDown, LogOutIcon, SquareChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

interface Props {
  className?: string;
}

export default function AdminAccountCard({ className }: Props) {
  const { isLoading, user, loggedOut } = useUser();
  const { logout } = useLogout();

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
              <Skeleton className="items h-4 w-[100px]" />
            </div>
            <DropdownMenu></DropdownMenu>
          </div>
        </div>
        <div className="flex justify-end w-full"></div>
      </div>
    );
  }

  return (
    user && (
      <div className={cn(className)}>
        <div className="flex items-center  gap-4">
          <Avatar>
            <AvatarImage src={user.avatarId || undefined} />
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
                <DropdownMenuItem>Выход</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex justify-end w-full"></div>
      </div>
    )
  );
}
