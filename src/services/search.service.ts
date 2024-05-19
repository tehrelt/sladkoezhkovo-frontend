import { api } from '@/api/axios.config';
import { SearchResults } from '@/lib/types/search.dto';

export class SearchService {
  static async search(query: string) {
    const response = await api.get<SearchResults>(`/search?q=${query}`);
    return response.data;
  }
}
