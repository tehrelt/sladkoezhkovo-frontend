import { api } from '@/api/axios.config';
import { UpdateAvatarResponse } from '@/lib/dto/account.dto';
import { ProfileDto } from '@/lib/dto/auth.dto';
import { Factory } from '@/lib/types/domain/factory.dto';
import { ListDto } from '@/lib/types/list.dto';

export class AccountService {
  static async getFactories(): Promise<ListDto<Factory>> {
    const { data } = await api.get<ListDto<Factory>>('/account/factories');
    return data;
  }
  static async createFactory(data: {
    name: string;
    handle: string;
    propertyTypeId: string;
    cityId: string;
    phoneNumber: string;
  }): Promise<Factory> {
    const response = await api.post<Factory>('/account/add-factory', data);

    if (response.status != 200) {
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

  static async updateAvatar(data): Promise<UpdateAvatarResponse> {
    const response = await api.patch<UpdateAvatarResponse>(
      '/account/avatar',
      data,
    );
    return response.data;
  }
}
