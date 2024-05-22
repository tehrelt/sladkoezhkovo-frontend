import { api } from '@/api/axios.config';
import { District } from '@/lib/types/domain/district.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';
import { DistrictFiltersDto } from '@/lib/filters/district-filters.dto';
import { DepsDto } from '@/lib/types/deps.dto';

export class DistrictService {
  static BASE_URL = '/districts';
  static async create(dto: {
    name: string;
    cityId: string;
  }): Promise<District> {
    const response = await api.post(this.BASE_URL, dto);
    return response.data;
  }

  static async list(
    f?: FiltersDto & DistrictFiltersDto,
  ): Promise<ListDto<District>> {
    const response = await api.get<ListDto<District>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<District> {
    const response = await api.get<District>(`/districts/${id}`);
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
