import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useUserOwnerships(slug: string) {
  const queryKey = ['users', slug, 'ownerships'];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => UserService.ownerships(slug),
    retry: false,
  });

  return { data, isLoading, isError, queryKey };
}
