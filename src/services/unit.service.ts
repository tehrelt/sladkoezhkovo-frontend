import { api } from '@/api/axios.config';
import { Unit } from '@/lib/types/domain/unit.dto';
import { ListDto } from '@/lib/types/list.dto';

export class UnitService {
  static async create(data: { name: string }): Promise<Unit> {
    const response = await api.post<Unit>('/units', data);
    return response.data;
  }
  static async list(): Promise<ListDto<Unit>> {
    const response = await api.get<ListDto<Unit>>('/units');
    return response.data;
  }

  static async find(id: string): Promise<Unit> {
    const response = await api.get<Unit>(`/units/${id}`);
    return response.data;
  }
}
