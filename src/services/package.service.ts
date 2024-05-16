import { api } from '@/api/axios.config';
import { Package } from '@/lib/types/domain/package.dto';
import { ListDto } from '@/lib/types/list.dto';

export class PackageService {
  static async create(data: { name: string }): Promise<Package> {
    const response = await api.post<Package>('/packages', data);
    return response.data;
  }
  static async list(): Promise<ListDto<Package>> {
    const response = await api.get<ListDto<Package>>('/packages');
    return response.data;
  }

  static async find(id: string): Promise<Package> {
    const response = await api.get<Package>(`/packages/${id}`);
    return response.data;
  }
}
