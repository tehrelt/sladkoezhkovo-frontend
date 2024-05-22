'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Bell, Check, X } from 'lucide-react';
import {
  useMarkAsReadNotifications,
  useUnreadNotifications,
} from '@/hooks/useNotifications';
import { Skeleton } from '../ui/skeleton';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { cn, datef } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { ScrollArea } from '../ui/scroll-area';

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

  const handleRead = (id: string) => {
    markAsRead([id]);
    readNotification(id);
  };

  const readAll = () => {
    markAsRead(notifications.map((n) => n.id));
    notifications.filter((n) => !n.read).forEach((n) => readNotification(n.id));
  };

  function handleRemove(id: string): void {
    markAsRead([id]);
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
          <div className="w-full flex justify-between items-center mb-4">
            <p className="text-lg font-bold">Уведомления</p>
            {!isLoading && notifications && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'ghost'}
                      className="p-2 h-fit"
                      onClick={() => readAll()}
                    >
                      <Check size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Прочитать всё</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <ScrollArea className="h-72">
            {!isLoading && notifications && (
              <ul className="list-none space-y-2">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      'hover:bg-slate-100 py-2 px-4 transition-all duration-200 rounded-sm cursor-pointer relative',
                      !n.read && 'bg-slate-100',
                    )}
                    onPointerEnter={() => handleRead(n.id)}
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-base font-bold">Новый заказ</span>
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
