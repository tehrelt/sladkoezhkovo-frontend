'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Bell, X } from 'lucide-react';
import {
  useMarkAsReadNotifications,
  useUnreadNotifications,
} from '@/hooks/useNotifications';
import { Skeleton } from '../ui/skeleton';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { cn, datef } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';

type Props = {};

const NotificationCenter = (props: Props) => {
  const {
    notifications,
    isLoading,
    unreadCount,
    readNotification,
    removeNotification,
  } = useUnreadNotifications();
  const { markAsRead, isPending } = useMarkAsReadNotifications({});
  const [isOpen, setIsOpen] = React.useState(false);

  const unread = unreadCount();

  const handleRead = () => {
    markAsRead(notifications.map((n) => n.id));
    // notifications
    //   .filter((n) => n.read === false)
    //   .forEach((n) => readNotification(n.id));
  };

  function handleRemove(id: string): void {
    removeNotification(id);
  }

  return (
    <div>
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger>
          <Button
            variant={
              (isLoading ? 'outline' : unread == 0) || isOpen
                ? 'ghost'
                : 'default'
            }
            className="space-x-1"
            onClick={handleRead}
          >
            <Bell />
            {!isLoading && notifications ? (
              unread !== 0 && <span>{unread > 9 ? '9+' : unread}</span>
            ) : (
              <Skeleton className="w-1 h-1" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <ScrollArea className="h-72">
            {!isLoading && notifications && (
              <ul className="list-none">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      'hover:bg-slate-100 py-2 px-4 transition-all duration-200 rounded-sm cursor-pointer relative',
                      !n.read && 'bg-slate-100',
                    )}
                    onPointerEnter={() => !n.read && readNotification(n.id)}
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold">Новый заказ</span>
                      <span className="text-sm">
                        {datef(new Date(n.retrivedAt))}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-sm">
                      <div>
                        <p>Магазин {n.shop.name} сделал у вас заказ</p>
                      </div>
                    </div>
                    <Button
                      variant={'ghost'}
                      className="absolute top-0 right-0 p-1 m-0 h-fit"
                      onClick={() => handleRemove(n.id)}
                    >
                      <X size={14} />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationCenter;
