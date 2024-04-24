'use client';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function UserHeaderCard() {
  const { user, isPending, loggedOut } = useUser();

  if (loggedOut) {
    return (
      <Link href="/auth">
        <Button>Вход</Button>
      </Link>
    );
  }

  if (!user) {
    <Link href="/auth">
      <Button>Вход</Button>
    </Link>;
  }

  return <>{user ? <h1>{user.name}</h1> : <h1>Unathorized</h1>}</>;
}
