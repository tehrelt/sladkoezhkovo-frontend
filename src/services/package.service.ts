import { api } from '@/api/axios.config';
import { Package } from '@/lib/types/domain/package.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';
import { DepsDto } from '@/lib/types/deps.dto';

export class PackageService {
  static BASE_URL = '/packages';

  static async create(data: { name: string }): Promise<Package> {
    const response = await api.post<Package>(this.BASE_URL, data);
    return response.data;
  }
  static async list(f?: FiltersDto): Promise<ListDto<Package>> {
    const response = await api.get<ListDto<Package>>(this.BASE_URL, {
      params: { ...f },
    });
    return response.data;
  }

  static async find(id: string): Promise<Package> {
    const response = await api.get<Package>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async deps(id: string): Promise<DepsDto> {
    const response = await api.get<DepsDto>(`${this.BASE_URL}/${id}/deps`);
    return response.data;
  }

  static async delete(id: string) {
    await api.delete(`${this.BASE_URL}/${id}`);
  }
}
