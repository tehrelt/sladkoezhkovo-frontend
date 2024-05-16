'use client';
import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { fio } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LOCAL_ROLES } from '@/consts/roles.consts';

type Props = {};

const Profile = (props: Props) => {
  const { user, isLoading } = useProfile();

  return (
    <div className="container">
      <div className="flex gap-x-2">
        <div className="flex-2 gap-x-4">
          <Card className="px-4 py-2 w-[400px] relative mb-4">
            <CardHeader className="items-center gap-2">
              {isLoading ? (
                <Skeleton className="w-[128px] h-[128px] rounded-full" />
              ) : (
                <Avatar className="w-[128px] h-[128px]">
                  <AvatarImage src={user.imageLink || undefined} />
                  <AvatarFallback>{user?.lastName.charAt(0)}</AvatarFallback>
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
                    <p className="font-medium">{user?.lastName}</p>
                    <p className="font-medium">
                      {user?.firstName} {user?.middleName}
                    </p>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {isLoading ? (
                  <Skeleton className="w-[64px] h-4" />
                ) : (
                  <p>@{user?.handle}</p>
                )}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ваши фабрики:</CardTitle>
            </CardHeader>
            <CardDescription></CardDescription>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader></CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
