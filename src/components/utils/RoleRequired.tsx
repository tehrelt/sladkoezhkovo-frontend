'use client';

import { ROLE } from '@/consts/roles.consts';
import { useProfile } from '@/hooks/useProfile';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  roles?: ROLE[];
}

export default function RoleRequired({ roles, children }: Props) {
  const { isLoading, user } = useProfile();

  if (!roles) {
    return <>{children}</>;
  }

  if (!isLoading && user && roles.includes(user?.role)) {
    return <>{children}</>;
  }

  return <></>;
}
