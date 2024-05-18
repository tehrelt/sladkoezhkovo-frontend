import { api } from '@/api/axios.config';
import {
  ApplicationDto,
  ApplicationSendDto,
} from '@/lib/types/domain/application.dto';
import { ErrorDto } from '@/lib/types/error.dto';
import { FiltersDto } from '@/lib/filters/index.dto';
import { AxiosError } from 'axios';

export class ApplicationService {
  static BASE_URL = '/applications';

  static async send(dto: ApplicationSendDto): Promise<void> {
    const response = await api.post(this.BASE_URL, dto);

    return response.data;
  }

  static async approve(id: string): Promise<void> {
    const response = await api.patch(`/applications/${id}/approve`);

    return response.data;
  }

  static async list(f?: FiltersDto): Promise<ApplicationDto[]> {
    const response = await api.get(this.BASE_URL, { params: f });

    return response.data;
  }

  static async find(id: string): Promise<ApplicationDto> {
    const response = await api.get(`${this.BASE_URL}/${id}`);

    return response.data;
  }
}
