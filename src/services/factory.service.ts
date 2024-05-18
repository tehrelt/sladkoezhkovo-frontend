import { api } from '@/api/axios.config';
import { EditFactoryDto } from '@/lib/dto/edit/factory.dto';
import { Factory } from '@/lib/types/domain/factory.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { ListDto } from '@/lib/types/list.dto';

export class FactoryService {
  static BASE_URL = '/factories';

  static async update(dto: EditFactoryDto): Promise<Factory> {
    const data = new FormData();
    data.append('name', dto.name);
    data.append('phoneNumber', dto.phoneNumber);
    dto.file && data.append('file', dto.file);

    const response = await api.patch<Factory>(
      `${this.BASE_URL}/${dto.id}`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  }
  static async list(f?: FiltersDto): Promise<ListDto<Factory>> {
    const response = await api.get<ListDto<Factory>>(this.BASE_URL, {
      params: f,
    });
    return response.data;
  }

  static async find(id: string): Promise<Factory> {
    const response = await api.get<Factory>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
