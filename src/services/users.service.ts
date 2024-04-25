import { api } from '@/api/axios.config';
import { User } from '@/lib/types/user';

export class UsersService {
  static async list(role: string = ''): Promise<User[]> {
    const res = await api.get<User[]>(`/users?role=${role}`);
    return res.data;
  }

  static async find(slug: string): Promise<User> {
    const res = await api.get<User>(`/users/${slug}`);
    return res.data;
  }
}
