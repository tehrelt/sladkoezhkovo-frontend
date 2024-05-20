import { api } from '@/api/axios.config';
import { UpdateAvatarResponse } from '@/lib/dto/account.dto';
import { ProfileDto } from '@/lib/dto/auth.dto';
import { CreateFactoryDto } from '@/lib/dto/create-factory.dto';
import { CreateShopDto } from '@/lib/dto/create/shop.dto';
import { Factory } from '@/lib/types/domain/factory.dto';
import { Shop } from '@/lib/types/domain/shop.dto';
import { ListDto } from '@/lib/types/list.dto';
import { AxiosError } from 'axios';

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

    try {
      const response = await api.post<Factory>('/account/add-factory', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }

      throw error;
    }
  }

  static async createShop(dto: CreateShopDto): Promise<Shop> {
    const data = new FormData();

    data.append('name', dto.name);
    data.append('handle', dto.handle);
    data.append('file', dto.file);
    data.append('districtId', dto.districtId);
    data.append('phoneNumber', dto.phoneNumber.toString());
    data.append('openSince', dto.openSince.toString());
    data.append('employeesCount', dto.employeesCount.toString());

    try {
      const response = await api.post<Shop>('/account/add-shop', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }

      throw error;
    }
  }

  static async profile(): Promise<ProfileDto> {
    const response = await api.get<ProfileDto>('/account');
    return response.data;
  }
}
