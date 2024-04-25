'use client';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { Skeleton } from '@/components/ui/skeleton';
import RoleRequired from '../utils/RoleRequired';
import { ROLES } from '@/consts/roles.consts';
import { PAGES } from '@/consts/pages.consts';

export default function UserHeaderCard() {
  const { user, isLoading, loggedOut } = useUser();
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
          <div className="">
            {/* <p className="text-right">{fio(user)}</p> */}
            <p className="text-right">
              {user.lastName} {user.firstName} {user.middleName}
            </p>
            <p className="text-muted-foreground text-right">
              @{user.handle} / {user.role}{' '}
            </p>
          </div>

          <RoleRequired roles={[ROLES.ADMIN, ROLES.MODERATOR]}>
            <Link href={PAGES.DASHBOARD}>
              <Button>Панель управления</Button>
            </Link>
          </RoleRequired>

          <Button onClick={() => logout()}>Выход</Button>
        </div>
      )}
    </div>
  );
}
