import RoleDataPage from '@/components/data-page/role.page';
import { useRole } from '@/hooks/dashboard/useRoles';
import { DataPageOptions } from '@/lib/types/options/data-page.options';
import { Role } from '@/lib/types/role.dto';

export const role_PAGE: DataPageOptions<Role> = {
  title: 'Роль',
  itemNameKey: 'name',
  render: (item, isLoading) => (
    <RoleDataPage role={item} isLoading={isLoading} />
  ),
  useData: useRole,
};
