import { DataPageOptions } from '@/lib/types/options/data-page.options';
import { USER_PAGE } from './user.page';
import { APPLICATION_PAGE } from './application.page';

export const DATA_PAGES: Record<string, DataPageOptions> = {
  applications: APPLICATION_PAGE,
  users: USER_PAGE,
};
