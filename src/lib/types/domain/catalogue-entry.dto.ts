import { DomainEntity } from './domain.dto';
import { Package } from './package.dto';
import { Unit } from './unit.dto';

export interface CatalogueEntry extends DomainEntity {
  id: string;
  price: number;
  quantity: number;
  unitUsage: number;
  unit: Unit;
  package: Package;
}
