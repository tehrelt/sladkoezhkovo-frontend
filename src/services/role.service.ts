import { api } from '@/api/axios.config';
import { CreateRoleDto } from '@/lib/dto/role.dto';
import { ListDto } from '@/lib/types/list.dto';
import { Role } from '@/lib/types/role.dto';

export class RoleService {
  static async list(): Promise<ListDto<Role>> {
    const response = await api.get<ListDto<Role>>('/roles');
    return response.data;
  }

  static async find(slug: string): Promise<Role> {
    const response = await api.get<Role>(`/roles/${slug}`);
    return response.data;
  }

  static async create(dto: CreateRoleDto): Promise<Role> {
    const response = await api.post<Role, any, CreateRoleDto>('/roles', dto);
    return response.data;
  }

  static async remove(slug: string): Promise<Role> {
    const response = await api.delete<Role>(`/roles/${slug}`);
    return response.data;
  }
}
