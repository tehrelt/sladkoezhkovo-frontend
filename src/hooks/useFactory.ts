import { AccountService } from '@/services/account.service';
import { FactoryService } from '@/services/factory.service';
import { useQuery } from '@tanstack/react-query';

export function useProfileFactories() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile', 'factories'],
    queryFn: AccountService.getFactories,
  });

  return { factories: data, isLoading };
}
