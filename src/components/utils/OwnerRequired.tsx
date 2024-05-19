'use client';

import { useProfile } from '@/hooks/useProfile';
import React from 'react';

type Props = {
  ownerHandle: string;
  children: React.ReactNode;
};

const OwnerRequired = ({ ownerHandle, children }: Props) => {
  const { isLoading, user } = useProfile();

  if (!isLoading && user && user.handle === ownerHandle) {
    return <>{children}</>;
  }

  return <></>;
};

export default OwnerRequired;
