import { AuthService } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data, isPending, isLoading, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.profile,
  });

  const loggedOut = !data;

  // if (!isLoading) {
  //   console.log(data);
  // }

  return { user: data, isPending, isLoading, loggedOut, isFetching };
}
