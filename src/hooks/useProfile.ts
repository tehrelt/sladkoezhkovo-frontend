import { AccountService } from '@/services/account.service';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: AccountService.profile,
    retry: false,
  });

  const loggedOut = !data;

  return { user: data, isLoading, loggedOut };
}
