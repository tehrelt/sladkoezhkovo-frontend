import { api } from '@/api/axios.config';
import { PropertyType } from '@/lib/types/domain/property-type.dto';
import { ListDto } from '@/lib/types/list.dto';

export class PropertyTypeService {
  static async create(data: { name: string }): Promise<PropertyType> {
    const response = await api.post<PropertyType>('/propertytypes', data);
    return response.data;
  }

  static async list(): Promise<ListDto<PropertyType>> {
    const response = await api.get<ListDto<PropertyType>>('/propertytypes');
    return response.data;
  }

  static async find(id: string): Promise<PropertyType> {
    const response = await api.get<PropertyType>(`/propertytypes/${id}`);
    return response.data;
  }
}
