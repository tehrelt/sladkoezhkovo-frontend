import { api } from '@/api/axios.config';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';
import { DepsDto } from '@/lib/types/deps.dto';

export class ConfectionaryTypeService {
  static BASE_URL = '/confectionary-types';

  static async create(data: { name: string }): Promise<ConfectionaryType> {
    const response = await api.post<ConfectionaryType>(this.BASE_URL, data);
    return response.data;
  }
  static async list(f?: FiltersDto): Promise<ListDto<ConfectionaryType>> {
    const response = await api.get<ListDto<ConfectionaryType>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<ConfectionaryType> {
    const response = await api.get<ConfectionaryType>(`${this.BASE_URL}/${id}`);
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
