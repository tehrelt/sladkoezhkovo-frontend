import { City } from './city.dto';
import { DomainEntity } from './domain.dto';

export interface Factory extends DomainEntity {
  name: string;
  handle: string;
  owner: {
    lastName: string;
    firstName: string;
    middleName: string;
    handle: string;
  };
  city: City;
  year: number;
  phoneNumber: string;
}
