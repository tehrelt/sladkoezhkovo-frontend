import { City } from './city.dto';
import { District } from './district.dto';
import { DomainEntity } from './domain.dto';

export interface Shop extends DomainEntity {
  name: string;
  handle: string;
  owner: {
    lastName: string;
    firstName: string;
    middleName: string;
    handle: string;
  };
  district: District;
  openSince: number;
  phoneNumber: string;
  employeesCount: number;
  image?: string;
}
