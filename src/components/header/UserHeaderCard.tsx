'use client';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { Skeleton } from '@/components/ui/skeleton';
import RoleRequired from '../utils/RoleRequired';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { PAGES } from '@/consts/pages.consts';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function UserHeaderCard() {
  const { user, isLoading, loggedOut } = useProfile();
  const { logout } = useLogout();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="items-end h-4 w-[100px]" />
        </div>
      </div>
    );
  }

  if (loggedOut) {
    return (
      <Link href="/auth">
        <Button>Вход</Button>
      </Link>
    );
  }

  return (
    <div>
      {user && (
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-start gap-x-4">
            <div className="flex flex-col items-start">
              <p className="text-right">
                {user.lastName} {user.firstName} {user.middleName}
              </p>
              <p className="text-muted-foreground text-right">
                @{user.handle} / {LOCAL_ROLES[user.role] || user.role}
              </p>
            </div>
            {isLoading ? (
              <Skeleton className="w-[128px] h-[128px] rounded-full" />
            ) : (
              <Link
                href={PAGES.PROFILE}
                className="w-[48px] h-[48px] flex items-center justify-center"
              >
                <Avatar className="w-[42px] h-[42px] hover:shadow-2xl hover:w-[44px] hover:h-[44px] transition-all duration-100">
                  <AvatarImage src={user?.imageLink} />
                  <AvatarFallback>{user?.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown color="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> Мой аккаунт </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RoleRequired roles={['ADMIN', 'MODERATOR']}>
                <DropdownMenuItem>
                  <Link href={PAGES.DASHBOARD}>Панель управления</Link>
                </DropdownMenuItem>
              </RoleRequired>
              <RoleRequired roles={['FACTORY_OWNER', 'SHOP_OWNER']}>
                <DropdownMenuItem>
                  <Link href={PAGES.PROFILE}>Профиль</Link>
                </DropdownMenuItem>
              </RoleRequired>
              <RoleRequired roles={['SHOP_OWNER']}>
                <DropdownMenuItem>
                  <Link href={`${PAGES.ADD_SHOP}`}>Добавить магазин</Link>
                </DropdownMenuItem>
              </RoleRequired>
              <RoleRequired roles={['FACTORY_OWNER']}>
                <DropdownMenuItem>
                  <Link href={`${PAGES.ADD_FACTORY}`}>Добавить фабрику</Link>
                </DropdownMenuItem>
              </RoleRequired>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
