import { api } from '@/api/axios.config';
import { EditFactoryDto } from '@/lib/dto/edit/factory.dto';
import { Factory } from '@/lib/types/domain/factory.dto';
import { Product } from '@/lib/types/domain/product.dto';
import { ListDto } from '@/lib/types/list.dto';

export class FactoryService {
  static async update(dto: EditFactoryDto): Promise<Factory> {
    const data = new FormData();
    data.append('name', dto.name);
    data.append('phoneNumber', dto.phone);
    dto.file && data.append('file', dto.file);

    const response = await api.patch<Factory>(`/factories/${dto.id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }
  static async list(): Promise<ListDto<Factory>> {
    const response = await api.get<ListDto<Factory>>('/factories');
    return response.data;
  }

  static async find(id: string): Promise<Factory> {
    const response = await api.get<Factory>(`/factories/${id}`);
    return response.data;
  }
}
