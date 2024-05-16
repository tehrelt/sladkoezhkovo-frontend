import { api } from '@/api/axios.config';
import {
  ApplicationDto,
  ApplicationSendDto,
} from '@/lib/types/domain/application.dto';
import { ErrorDto } from '@/lib/types/error.dto';
import { AxiosError } from 'axios';

export class ApplicationService {
  static async send(dto: ApplicationSendDto): Promise<void> {
    const response = await api.post('/applications', { ...dto });

    if (response.status !== 201) {
      const err = response as unknown as AxiosError;
      const dto = err.response?.data as ErrorDto;
      throw new Error(dto.message);
    }

    return response.data;
  }

  static async approve(id: string): Promise<void> {
    const response = await api.patch(`/applications/${id}/approve`);

    if (response.status !== 200) {
      const err = response as unknown as AxiosError;
      const dto = err.response?.data as ErrorDto;
      throw new Error(dto.message);
    }

    return response.data;
  }

  static async list(): Promise<ApplicationDto[]> {
    const response = await api.get('/applications');

    if (response.status !== 200) {
      const err = response as unknown as AxiosError;
      const dto = err.response?.data as ErrorDto;
      throw new Error(dto.message);
    }

    return response.data;
  }

  static async find(id: string): Promise<ApplicationDto> {
    const response = await api.get(`/applications/${id}`);

    if (response.status !== 200) {
      const err = response as unknown as AxiosError;
      const dto = err.response?.data as ErrorDto;
      throw new Error(dto.message);
    }

    return response.data;
  }
}
