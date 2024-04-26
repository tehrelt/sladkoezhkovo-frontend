import UserDataPage from '@/components/data-page/user.page';
import { useUser } from '@/hooks/dashboard/useUsers';
import { DataPageOptions } from '@/lib/types/options/data-page.options';
import { User } from '@/lib/types/user';

export const USER_PAGE: DataPageOptions<User> = {
  title: 'Пользователь',
  itemNameKey: 'handle',
  render: (item, isLoading) => (
    <UserDataPage user={item} isLoading={isLoading} />
  ),
  useData: useUser,
};
