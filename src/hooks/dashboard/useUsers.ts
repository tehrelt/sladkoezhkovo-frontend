import { UsersService } from '@/services/users.service';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => UsersService.list(),
  });

  return { data, isLoading };
};

export const useUser = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', id],
    queryFn: () => UsersService.find(id),
  });

  return { data, isLoading };
};
