import { DomainEntity } from './domain.dto';
import { Unit } from './unit.dto';

export interface Package extends DomainEntity {
  name: string;
  unit: Unit;
}
