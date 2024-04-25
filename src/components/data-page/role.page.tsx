import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LOCAL_ROLES } from '@/consts/roles.consts';
import { Role } from '@/lib/types/role';
import { UsersService } from '@/services/users.service';
import { useQuery } from '@tanstack/react-query';

type Props = {
  role: Role;
  isLoading: boolean;
};

export default function RoleDataPage({ role, isLoading }: Props) {
  if (isLoading) return <></>;

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['role', role.name, 'users'],
    queryFn: () => UsersService.list(role.name),
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

        <CardContent>
          <ul>{users?.map((u) => <li>{u.email}</li>)}</ul>
        </CardContent>
      </Card>
    </div>
  );
}
