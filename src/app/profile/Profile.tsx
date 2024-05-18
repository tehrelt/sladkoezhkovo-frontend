'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfileFactories } from '@/hooks/useFactory';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { PAGES } from '@/consts/pages.consts';

type Props = {};

const Profile = (props: Props) => {
  const { user, isLoading } = useProfile();
  const { factories, isLoading: factoriesLoading } = useProfileFactories();

  return (
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
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold">Владения</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-4">
          {factoriesLoading ? (
            <>Loading...</>
          ) : (
            <>
              {factories?.items.map((factory) => (
                // eslint-disable-next-line react/jsx-key
                <Link
                  href={`/factory/${factory.handle}`}
                  className="hover:underline"
                >
                  <Card className="h-full ">
                    <CardHeader className="flex flex-col items-center justify-between h-full space-y-2">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={factory.image} />
                        <AvatarFallback />
                      </Avatar>
                      <div className="w-full">
                        <CardTitle className="text-lg">
                          {factory.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
              <Link href={PAGES.ADD_FACTORY}>
                <Card className="border-dashed flex justify-center items-center w-full h-full hover:bg-slate-50 transition-all">
                  <Plus />
                </Card>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
