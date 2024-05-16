import { api } from '@/api/axios.config';
import { Factory } from '@/lib/types/domain/factory.dto';
import { ListDto } from '@/lib/types/list.dto';

export class FactoryService {
  static async list(): Promise<ListDto<Factory>> {
    const response = await api.get<ListDto<Factory>>('/factories');
    return response.data;
  }

  static async find(id: string): Promise<Factory> {
    const response = await api.get<Factory>(`/factories/${id}`);
    return response.data;
  }
}
