'use client';

import { useUser } from '@/hooks/useUser';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  roles?: string[];
}

export default function RoleRequired({ roles, children }: Props) {
  const { isLoading, user } = useUser();

  if (!roles) {
    return <>{children}</>;
  }

  if (!isLoading && user && roles.includes(user?.role)) {
    return <>{children}</>;
  }

  return <></>;
}
