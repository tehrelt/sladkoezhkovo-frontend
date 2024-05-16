import { api } from '@/api/axios.config';
import { User } from '@/lib/types/domain/user';
import { User } from 'lucide-react';

export class UserService {
  static async list(role: string = ''): Promise<User[]> {
    const res = await api.get<User[]>(`/users?role=${role}`);
    return res.data;
  }

  static async find(slug: string): Promise<User> {
    const res = await api.get<User>(`/users/${slug}`);
    return res.data;
  }

  static async update(user: Partial<User>) {
    const res = await api.patch<User>(`/users/${user.id}`, user);
    return res.data;
  }
}
