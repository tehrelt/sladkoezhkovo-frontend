import { IBase, Iid } from './base';

export interface User extends IBase, Iid {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
