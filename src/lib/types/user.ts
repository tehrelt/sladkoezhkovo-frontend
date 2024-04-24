import { IBase, Iid } from './base';

export interface User extends IBase, Iid {
  handle: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
