import { AuthService } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.profile,
  });

  const loggedOut = !data;

  return { user: data, isPending, loggedOut };
}
