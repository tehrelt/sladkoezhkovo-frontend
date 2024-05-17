'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useUser } from '@/hooks/dashboard/useUsers';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  handle: string;
  className?: string;
};

const Mention = ({ handle, className }: Props) => {
  const { data, isLoading } = useUser(handle);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/${handle}`} className={cn(className, 'hover:underline')}>
          @{handle}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between space-x-2">
          <Avatar>
            <AvatarImage src={data?.imageLink} />
            <AvatarFallback>{data?.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{handle}</h4>
            <p className="text-sm">
              {data?.lastName} {data?.firstName} {data?.middleName}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Mention;
