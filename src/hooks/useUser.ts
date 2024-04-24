import { AccountService } from '@/services/account.service';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data, isPending, isLoading, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: AccountService.profile,
  });

  const loggedOut = !data;

  return { user: data, isPending, isLoading, loggedOut, isFetching };
}
