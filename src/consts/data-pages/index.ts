import { DataPageOptions } from '@/lib/types/data-page-options';
import { USER_PAGE } from './user.page';
import { role_PAGE } from './role.page';

export const DATA_PAGES: Record<string, DataPageOptions> = {
  users: USER_PAGE,
  roles: role_PAGE,
};
