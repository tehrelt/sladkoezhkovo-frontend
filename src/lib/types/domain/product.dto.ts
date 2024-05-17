import { ConfectionaryType } from './confectionary-type.dto';
import { DomainEntity } from './domain.dto';
import { Factory } from './factory.dto';

export interface Product extends DomainEntity {
  name: string;
  confectionaryType: ConfectionaryType;
  factory: Factory;
  image: string;
}
