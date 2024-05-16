import { IBase, Iid } from '../base';
import { DomainEntity } from './domain.dto';

export interface District extends DomainEntity {
  name: string;
  city: string;
  cityId: string;
}
