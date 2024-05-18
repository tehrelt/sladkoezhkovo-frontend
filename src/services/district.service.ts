import { api } from '@/api/axios.config';
import { District } from '@/lib/types/domain/district.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';

export class DistrictService {
  static BASE_URL = '/districts';
  static async create(dto: {
    name: string;
    cityId: string;
  }): Promise<District> {
    const response = await api.post(this.BASE_URL, dto);
    return response.data;
  }

  static async list(f?: FiltersDto): Promise<ListDto<District>> {
    const response = await api.get<ListDto<District>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<District> {
    const response = await api.get<District>(`/districts/${id}`);
    return response.data;
  }
}
