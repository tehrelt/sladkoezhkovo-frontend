import { AuthService } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const client = useQueryClient();
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.logout,
    onSuccess: () => {
      push('/');
      client.removeQueries({ queryKey: ['user'] });
    },
  });

  return { logout: mutate };
}
