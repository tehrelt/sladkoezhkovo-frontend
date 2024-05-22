import { FiltersDto } from '@/lib/filters/index.dto';
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

export function useShopsShipments(f?: FiltersDto) {
  const queryKey = ['user', 'shipments'];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => AccountService.shopShipments(f),
    retry: false,
  });

  return { data, isLoading, queryKey };
}
