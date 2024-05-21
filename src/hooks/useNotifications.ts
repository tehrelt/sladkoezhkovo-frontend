import { NotificationsService } from '@/services/notifications.service';
import { useNotificationStore } from '@/store/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUnreadNotifications() {
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationsService.listUnread,
    retry: false,
  });

  const n = useNotificationStore((state) => state.notifications);
  const push = useNotificationStore((state) => state.push);
  const remove = useNotificationStore((state) => state.remove);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const read = useNotificationStore((state) => state.read);

  if (!isLoading && data) {
    data.notifications.map((n) => push(n));
  }

  return {
    notifications: n,
    isLoading,
    removeNotification: remove,
    unreadCount,
    readNotification: read,
  };
}

export function useMarkAsReadNotifications({
  onError,
  onSuccess,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['mark-as-read-notifications'],
    mutationFn: (ids: string[]) => NotificationsService.read(...ids),
    onError,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['notifications'],
      });
      onSuccess?.();
    },
  });

  return { markAsRead: mutate, isPending };
}
