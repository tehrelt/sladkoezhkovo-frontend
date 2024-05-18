import { api } from '@/api/axios.config';
import { CreateCatalogueEntryDto } from '@/lib/dto/create/catalogue-entry.dto';
import { CatalogueEntry } from '@/lib/types/domain/catalogue-entry.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';
import { CatalogueFilters } from '@/lib/filters/catalogue-filters.dto';

export class CatalogueService {
  static BASE_URL = '/catalogue';
  static async create(dto: CreateCatalogueEntryDto) {
    const response = await api.post<CatalogueEntry>(this.BASE_URL, dto);
    return response.data;
  }

  static async list(
    f?: FiltersDto & CatalogueFilters,
  ): Promise<ListDto<CatalogueEntry>> {
    const response = await api.get<ListDto<CatalogueEntry>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<CatalogueEntry> {
    const response = await api.get<CatalogueEntry>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
