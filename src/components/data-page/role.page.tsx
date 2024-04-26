import DashboardTableView from '@/app/dashboard/[table]/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { Role } from '@/lib/types/role.dto';
import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../data-table';
import { USERS_COLUMNS } from '@/consts/tables/user.table';
import { LoadingDataTable } from '../data-table/LoadingDataTable';

type Props = {
  role: Role;
  isLoading: boolean;
};

export default function RoleDataPage({ role, isLoading }: Props) {
  if (isLoading) return <></>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['role', role.id, 'users'],
    queryFn: () => UserService.list(role.name),
  });

  return (
    <div className="flex flex-col gap-4">
      <Card className="px-4 py-2">
        <CardHeader className="items-center gap-2">
          <CardTitle>
            {isLoading ? (
              <Skeleton className="h-4 w-[32px]" />
            ) : (
              LOCAL_ROLES[role.name] || role.name
            )}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Пользователи с этой ролью</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingDataTable
            data={users}
            columns={USERS_COLUMNS}
            isLoading={usersLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
