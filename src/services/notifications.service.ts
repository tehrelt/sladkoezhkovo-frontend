import { api } from '@/api/axios.config';
import { NotificationDto } from '@/lib/dto/notification.dto';

type unreadList = { notifications: NotificationDto[] };

export class NotificationsService {
  static async listUnread(): Promise<unreadList> {
    const response = await api.get<unreadList>('/notifications/unread');
    return response.data;
  }

  static async read(...ids: string[]) {
    const response = await api.patch('/notifications/read', {
      notifications: ids,
    });
    return response.data;
  }
}
