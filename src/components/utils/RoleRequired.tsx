'use client';

import { ROLE } from '@/consts/roles.consts';
import { useProfile } from '@/hooks/useProfile';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  roles?: ROLE[];
}

export default function AuthRequired({ roles, children }: Props) {
  const { isLoading, user, loggedOut } = useProfile();

  if (loggedOut) {
    return <></>;
  }

  if (!roles) {
    return <>{children}</>;
  }

  if (!isLoading && user && roles.includes(user?.role)) {
    return <>{children}</>;
  }

  return <></>;
}
