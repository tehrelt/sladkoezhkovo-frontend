import { z } from 'zod';
import { applicationForm } from '../forms/application.form';

export type ApplicationSendDto = z.infer<typeof applicationForm>;
