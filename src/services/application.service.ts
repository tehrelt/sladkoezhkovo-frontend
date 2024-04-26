import { api } from '@/api/axios.config';
import { ApplicationSendDto } from '@/lib/types/application.dto';
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
}
