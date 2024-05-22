import { api } from '@/api/axios.config';
import { PropertyType } from '@/lib/types/domain/property-type.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';
import { DepsDto } from '@/lib/types/deps.dto';

export class PropertyTypeService {
  static BASE_URL = '/property-types';

  static async create(data: { name: string }): Promise<PropertyType> {
    const response = await api.post<PropertyType>(this.BASE_URL, data);
    return response.data;
  }

  static async list(f?: FiltersDto): Promise<ListDto<PropertyType>> {
    const response = await api.get<ListDto<PropertyType>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<PropertyType> {
    const response = await api.get<PropertyType>(`${this.BASE_URL}/${id}`);
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
