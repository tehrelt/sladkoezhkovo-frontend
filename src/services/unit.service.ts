import { api } from '@/api/axios.config';
import { Unit } from '@/lib/types/domain/unit.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';

export class UnitService {
  static BASE_URL = '/units';

  static async create(data: { name: string }): Promise<Unit> {
    const response = await api.post<Unit>(this.BASE_URL, data);
    return response.data;
  }
  static async list(f?: FiltersDto): Promise<ListDto<Unit>> {
    const response = await api.get<ListDto<Unit>>(this.BASE_URL, { params: f });
    return response.data;
  }

  static async find(id: string): Promise<Unit> {
    const response = await api.get<Unit>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
