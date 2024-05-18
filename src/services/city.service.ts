import { api } from '@/api/axios.config';
import { City } from '@/lib/types/domain/city.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';

export class CityService {
  static BASE_URL = '/cities';

  static async create(data: { name: string }): Promise<City> {
    const response = await api.post<City>(this.BASE_URL, data);
    return response.data;
  }
  static async list(f?: FiltersDto): Promise<ListDto<City>> {
    const response = await api.get<ListDto<City>>(this.BASE_URL, { params: f });
    return response.data;
  }

  static async find(id: string): Promise<City> {
    const response = await api.get<City>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
