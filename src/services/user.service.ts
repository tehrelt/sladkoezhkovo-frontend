import { api } from '@/api/axios.config';
import { User } from '@/lib/types/domain/user';
import { FiltersDto } from '@/lib/filters/index.dto';
import { UserFilters } from '@/lib/filters/user-filters.dto';
import { OwnershipsDto } from '@/lib/dto/ownerships.dto';

export class UserService {
  static BASE_URL = '/users';

  static async list(f?: FiltersDto & UserFilters): Promise<User[]> {
    const res = await api.get<User[]>(this.BASE_URL, {
      params: f,
    });

    return res.data;
  }

  static async find(slug: string): Promise<User> {
    const res = await api.get<User>(`${this.BASE_URL}/${slug}`);
    return res.data;
  }

  static async ownerships(slug: string): Promise<OwnershipsDto> {
    const res = await api.get<OwnershipsDto>(
      `${this.BASE_URL}/${slug}/ownerships`,
    );
    return res.data;
  }

  static async update(user: Partial<User>) {
    const res = await api.patch<User>(`${this.BASE_URL}/${user.id}`, user);
    return res.data;
  }
}
