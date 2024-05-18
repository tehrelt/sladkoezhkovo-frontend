import { FiltersDto } from '@/lib/filters/index.dto';
import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useUsers(f?: FiltersDto) {
  const key = ['users'];
  if (f) {
    f.limit && key.push(f.limit.toString());
    f.page && key.push(f.page.toString());
  }

  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => UserService.list(f),
  });

  return { data, isLoading, queryKey: key };
}

export const useUser = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', id],
    queryFn: () => UserService.find(id),
  });

  return { data, isLoading };
};
