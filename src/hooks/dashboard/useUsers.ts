import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.list(),
  });

  return { data, isLoading };
};

export const useUser = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', id],
    queryFn: () => UserService.find(id),
  });

  return { data, isLoading };
};
