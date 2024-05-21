export interface NotificationDto {
  id: string;
  shop: {
    name: string;
    handle: string;
  };
  retrivedAt: string;
  read: boolean;
}
