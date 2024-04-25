import { IBase, Iid } from './base';

export interface Role extends IBase, Iid {
  name: string;
  authority: number;
}
