import { NotificationDto } from '@/lib/dto/notification.dto';
import { read, stat } from 'fs';
import { noUnrecognized } from 'zod';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type NotificationStore = {
  notifications: NotificationDto[];
  unreadCount: () => number;
  push: (notification: NotificationDto) => void;
  remove: (id: string) => void;
  read: (id: string) => void;
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    devtools((set, get) => ({
      notifications: [],

      push: (notification: NotificationDto) => {
        set((state) => {
          const item = state.notifications.find(
            (n) => n.id === notification.id,
          );

          if (item) {
            return { ...state };
          }

          return {
            notifications: [notification, ...state.notifications],
          };
        });
      },

      remove: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      unreadCount: () => {
        const state = get();
        return state.notifications.reduce((i, n) => (n.read ? i : i + 1), 0);
      },

      read: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        }));
      },
    })),

    { name: 'notifications' },
  ),
);
