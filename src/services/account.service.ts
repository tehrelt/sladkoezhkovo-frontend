import { api } from '@/api/axios.config';
import { UpdateAvatarResponse } from '@/lib/dto/account.dto';
import { ProfileDto } from '@/lib/dto/auth.dto';

export class AccountService {
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
