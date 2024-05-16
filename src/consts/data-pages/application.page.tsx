import ApplicationDataPage from '@/components/data-page/application.page';
import UserDataPage from '@/components/data-page/user.page';
import { useApplication } from '@/hooks/dashboard/useApplications';
import { ApplicationDto } from '@/lib/types/domain/application.dto';
import { DataPageOptions } from '@/lib/types/options/data-page.options';
import { User } from '@/lib/types/domain/user';

export const APPLICATION_PAGE: DataPageOptions<ApplicationDto> = {
  title: 'Заявка на регистрацию',
  itemNameKey: 'handle',
  render: (item, isLoading) => (
    <ApplicationDataPage application={item} isLoading={isLoading} />
  ),
  useData: useApplication,
};
