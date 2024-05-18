import { api } from '@/api/axios.config';
import { UpdateAvatarResponse } from '@/lib/dto/account.dto';
import { ProfileDto } from '@/lib/dto/auth.dto';
import { CreateFactoryDto } from '@/lib/dto/create-factory.dto';
import { Factory } from '@/lib/types/domain/factory.dto';
import { ListDto } from '@/lib/types/list.dto';

export class AccountService {
  static async getFactories(): Promise<ListDto<Factory>> {
    const { data } = await api.get<ListDto<Factory>>('/account/factories');
    return data;
  }

  static async createFactory(dto: CreateFactoryDto): Promise<Factory> {
    const data = new FormData();

    data.append('name', dto.name);
    data.append('file', dto.file);
    data.append('cityId', dto.cityId);
    data.append('handle', dto.handle);
    data.append('phoneNumber', dto.phoneNumber);
    data.append('propertyTypeId', dto.propertyTypeId);
    data.append('year', dto.year);

    console.log(data);

    const response = await api.post<Factory>('/account/add-factory', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.status != 201) {
      throw new Error(
        `${response.status} ${response.statusText} JSON: ${JSON.stringify(response.data)}`,
      );
    }
    return response.data;
  }

  static async profile(): Promise<ProfileDto> {
    const response = await api.get<ProfileDto>('/account');
    return response.data;
  }
}
