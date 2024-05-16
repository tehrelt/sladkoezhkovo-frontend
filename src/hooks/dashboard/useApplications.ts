import { ApplicationService } from '@/services/application.service';
import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useApplications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => ApplicationService.list(),
  });

  return { data, isLoading };
};

export const useApplication = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['applications', id],
    queryFn: () => ApplicationService.find(id),
  });

  return { data, isLoading };
};
