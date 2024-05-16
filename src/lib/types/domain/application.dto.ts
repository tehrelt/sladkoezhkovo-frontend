import { z } from 'zod';
import { applicationForm } from '../../forms/application.form';
import { ROLE } from '@/consts/roles.consts';
import { DomainEntity } from './domain.dto';

export type ApplicationSendDto = z.infer<typeof applicationForm>;

export interface ApplicationDto extends DomainEntity {
  role: ROLE;
  lastName: string;
  firstName: string;
  middleName: string;
  handle: string;
  email: string;
  approved: boolean;
}
