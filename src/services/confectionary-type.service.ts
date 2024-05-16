import { api } from '@/api/axios.config';
import { ConfectionaryType } from '@/lib/types/domain/confectionary-type.dto';
import { ListDto } from '@/lib/types/list.dto';

export class ConfectionaryTypeService {
  static async create(data: { name: string }): Promise<ConfectionaryType> {
    const response = await api.post<ConfectionaryType>(
      '/confectionarytypes',
      data,
    );
    return response.data;
  }
  static async list(): Promise<ListDto<ConfectionaryType>> {
    const response = await api.get<ListDto<ConfectionaryType>>(
      '/confectionarytypes',
    );
    return response.data;
  }

  static async find(id: string): Promise<ConfectionaryType> {
    const response = await api.get<ConfectionaryType>(
      `/confectionarytypes/${id}`,
    );
    return response.data;
  }
}
