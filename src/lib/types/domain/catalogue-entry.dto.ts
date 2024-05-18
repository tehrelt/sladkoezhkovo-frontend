import { DomainEntity } from './domain.dto';

export interface CatalogueEntry extends DomainEntity {
  id: string;
  price: number;
  quantity: number;
}
