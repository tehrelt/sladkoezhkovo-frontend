import { api } from '@/api/axios.config';
import { District } from '@/lib/types/domain/district.dto';
import { ListDto } from '@/lib/types/list.dto';

export class DistrictService {
  static async create(dto: {
    name: string;
    cityId: string;
  }): Promise<District> {
    const response = await api.post('/districts', dto);
    return response.data;
  }

  static async list(): Promise<ListDto<District>> {
    const response = await api.get<ListDto<District>>('/districts');
    return response.data;
  }

  static async find(id: string): Promise<District> {
    const response = await api.get<District>(`/districts/${id}`);
    return response.data;
  }
}
