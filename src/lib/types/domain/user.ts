import { ROLE } from '@/consts/roles.consts';
import { DomainEntity } from './domain.dto';

export interface User extends DomainEntity {
  handle: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: ROLE;
  imageLink: string;
}

export interface UserList {
  users: User[];
  count: number;
}
