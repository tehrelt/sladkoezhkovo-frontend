import { SearchService } from '@/services/search.service';
import { useQuery } from '@tanstack/react-query';

export function useSearch(query: string) {
  const queryKey = ['search', query];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => SearchService.search(query),
    retry: false,
  });

  return { data, isLoading, isError, queryKey };
}
