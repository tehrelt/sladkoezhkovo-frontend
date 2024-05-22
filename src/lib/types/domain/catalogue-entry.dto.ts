import { DomainEntity } from './domain.dto';
import { Package } from './package.dto';
import { Unit } from './unit.dto';

export interface CatalogueEntry extends DomainEntity {
  id: string;
  price: number;
  quantity: number;
  unitUsage: number;
  package: Package;
  product: {
    id: string;
    name: string;
    confectionaryType: string;
    image?: string;
  };
  factory: {
    name: string;
    handle: string;
  };
}
